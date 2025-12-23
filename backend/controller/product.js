const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const upload = require("../multer");

router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId } = req.body;

      // check shop
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      }

      // files coming from multer
      const files = req.files;

      // SAME STRUCTURE AS AVATAR LOGIC
      const imageObjects = files.map((file) => ({
        public_id: file.filename,
        url: `${process.env.SERVER_URL || "http://localhost:8000"}/${
          file.filename
        }`,
      }));

      // create product data
      const productData = {
        ...req.body,
        images: imageObjects, // <---- HERE
        shop: shop, // <---- HERE // shop:shop
      };

      // create product
      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all the products of the shop

router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

      const products = await Product.find({ shopId: id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// delete product
const fs = require("fs");
const path = require("path");

router.delete(
  "/delete-shop-product/:id",
  catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        const imagePath = path.join(
          __dirname,
          "..",
          "..",
          "uploads",
          img.public_id
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        } else {
          console.log("File not found:", imagePath);
        }
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product and images deleted successfully",
    });
  })
);

module.exports = router;
