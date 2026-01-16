const express = require("express");
const router = express.Router();
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/JwtToken");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { email, password, name } = req.body;
  const userEmail = await User.findOne({ email: email });
  if (userEmail) {
    if (req.file) {
      // safely delete uploaded file if user already exists
      const filePath = path.join(process.cwd(), "uploads", req.file.filename);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting duplicate file:", err);
        } else {
          console.log("Deleted duplicate uploaded file:", filePath);
        }
      });
    }

    return next(new ErrorHandler("User already exists", 400));
  }

  if (!email || !password || !name || !req.file) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const filename = req.file ? req.file.filename : null;
  const avatarObj = {
    public_id: filename,
    url: `${process.env.SERVER_URL || "http://localhost:8000"}/${filename}`,
  };

  const user = {
    name,
    email,
    password,
    avatar: avatarObj,
  };

  function createActivationToken(user) {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    };
    return jwt.sign(payload, process.env.ACTIVATION_SECRET, {
      expiresIn: "1d",
    });
  }

  const activationToken = createActivationToken(user);
  const encodedToken = encodeURIComponent(activationToken);
  const activationUrl = `${
    process.env.FRONTEND_URL || "http://localhost:5173"
  }/activate/${encodedToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account!",
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `Please check your email:- ${user.email} to activate your account!`,
    });
  } catch (error) {
    return next(ErrorHandler(err.message, 500));
  }
});

router.post(
  "/activate",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activationToken } = req.body;

      const token = activationToken;

      const newUser = jwt.verify(token, process.env.ACTIVATION_SECRET);

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }

      const { name, email, password, avatar } = newUser;

      const user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      const createdUser = await User.create({
        name,
        password,
        email,
        avatar,
      });
      sendToken(createdUser, 201, res);
    } catch (err) {
      console.error("Activation error:", {
        name: err && err.name,
        message: err && err.message,
        tokenSample: token ? token.slice(0, 20) + "..." : null,
        ACTIVATION_SECRET: !!process.env.ACTIVATION_SECRET,
      });
      if (err && err.name === "TokenExpiredError") {
        return next(
          new ErrorHandler(
            "Activation token expired. Please request a new activation email.",
            400
          )
        );
      }
      return next(new ErrorHandler("Invalid activation token", 400));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please enter all the fields", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User does not exist!", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
  })
);
// load user

router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler("Error fetching user data", 500));
    }
  })
);
// update user information
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, phoneNumber, password } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (password) {
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Incorrect password", 400));
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      // ❌ If no file uploaded
      if (!req.file) {
        return next(new ErrorHandler("Please upload an image", 400));
      }

      // ✅ Extract old avatar filename
      if (user.avatar && user.avatar.url) {
        const oldAvatar = user.avatar.url.split("/").pop();
        const oldAvatarPath = path.join(process.cwd(), "uploads", oldAvatar);

        // ✅ Delete old avatar
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }

      // ✅ Save new avatar
      user.avatar = {
        public_id: req.file.filename,
        url: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      };

      await user.save();

      res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logout user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { addresses } = req.body;
      const user = await User.findById(req.user.id);
      const sameTypeAddresses = user.addresses.find(
        (address) => address.addressType === addresses.addressType
      );
      if (sameTypeAddresses) {
        return next(
          new ErrorHandler(
            `Address of type ${addresses.addressType} already exists`,
            400
          )
        );
      }

      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );
      if (existAddress) {
        Object.assign(existAddress, addresses);
      } else {
        user.addresses.push(req.body);
      }

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      await user.save();
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
