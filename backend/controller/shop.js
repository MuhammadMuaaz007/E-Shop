const express = require("express");
const router = express.Router();
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../multer");
const fs = require("fs");
const path = require("path");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const sendToken = require("../utils/JwtToken");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const sendShopToken = require("../utils/ShopToken");

// Create Shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      const filename = req.file?.filename;
      if (filename) {
        const filePath = path.join(process.cwd(), "uploads", filename);
        fs.unlink(filePath, (err) => {
          if (err) console.log("Error deleting duplicate file:", err);
        });
      }
      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file ? req.file.filename : null;
    const avatarObj = {
      public_id: filename,
      url: `${process.env.SERVER_URL || "http://localhost:8000"}/${filename}`,
    };
    const seller = {
      name: req.body.name,
      email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      avatar: avatarObj, // ✅ important
    };

    const activationToken = jwt.sign(
      {
        name: seller.name,
        email: seller.email,
        password: seller.password,
        avatar: seller.avatar,
        address: seller.address,
        zipCode: seller.zipCode,
        phoneNumber: seller.phoneNumber,
      },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "1d" }
    );

    const encodedToken = encodeURIComponent(activationToken);
    const activationUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/seller/activate/${encodedToken}`;

    await sendMail({
      email: seller.email,
      subject: "Activate your shop",
      message: `Hello ${seller.name}, please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${seller.email} to activate your account!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Activate Shop
router.post(
  "/activate",
  catchAsyncErrors(async (req, res, next) => {
    const { activationToken } = req.body;
    const token = activationToken;
    try {
      const newSeller = jwt.verify(token, process.env.ACTIVATION_SECRET);

      if (!newSeller) {
        return next(new ErrorHandler("Invalid Token", 400));
      }

      const { name, email, password, avatar, zipCode, phoneNumber, address } =
        newSeller;

      const seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }
      const createdSeller = await Shop.create({
        name,
        password,
        email,
        avatar,
        zipCode,
        address,
        phoneNumber,
      });
      sendToken(createdSeller, 201, res);
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
      return next(new ErrorHandler(err.message, 400));
    }
  })
);
// login shop

router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please Enter all the fields:", 400));
      }
      const shop = await Shop.findOne({ email }).select("+password");
      if (!shop) {
        return next(new ErrorHandler("Shop does not exist!", 400));
      }
      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please Provide correct information!", 400)
        );
      }
      sendShopToken(shop, 200, res);
 
    } catch (error) {
      return next(new ErrorHandler("Invalid Email or password!", 400));
    }
  })
);

// load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("User not found", 404));
      }
      res.status(200).json({ success: true, seller });
    } catch (error) {
      return next(new ErrorHandler("Error fetching user data", 500));
    }
  })
);

//logout shop
router.get(
  "/logout",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
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

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;
