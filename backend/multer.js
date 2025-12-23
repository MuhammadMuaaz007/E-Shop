const multer = require("multer");
const  path  = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0]; // to get the name of the file without extension from client user computer when they upload the file
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage });

module.exports = upload; // we are exporting the upload variable because we will use it in the routes to upload the images
