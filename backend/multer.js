// import multer from "multer";

const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "public/images"); //Call BackFunction(Error,destination)
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const filename = file.originalname.split(".")[0];
//     cb(null, filename + "-" + uniqueSuffix + ".png");
//   },
// });

// // Store file in memory (RAM), not disk
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
// export default upload;
module.exports = upload;





// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     // ✅ get original extension (.png, .jpg, etc.)
//     const ext = path.extname(file.originalname);

//     // ✅ clean filename (remove spaces & special chars)
//     const cleanName = path
//       .basename(file.originalname, ext)
//       .replace(/\s+/g, "-")
//       .replace(/[^\w-]/g, "");

//     // ✅ unique name
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

//     cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;
