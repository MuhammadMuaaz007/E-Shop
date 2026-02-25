const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const upload = require("../multer");
const Order = require("../model/order");
const cloudinary = require("cloudinary");
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId } = req.body;

      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      }
      // files coming from multer
      // const files = req.files;

      // const imageObjects = files.map((file) => ({
      //   public_id: file.filename,
      //   url: `${process.env.SERVER_URL || "http://localhost:8000"}/${
      //     file.filename
      //   }`,
      // }));
      const uploadedImages = [];

      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const myCloud = cloudinary.v2.uploader.upload_stream(
            {
              folder: "products",
            },
            (error, myCloud) => {
              if (error) reject(error);
              else resolve(myCloud);
            },
          );

          myCloud.end(file.buffer);
        });
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      // create product data
      const productData = {
        ...req.body,
        images: uploadedImages,
        shop: shop,
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
  }),
);

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
  }),
);

// delete product
const fs = require("fs");
const path = require("path");
const { isAuthenticated } = require("../middleware/auth");

router.delete(
  "/delete-shop-product/:id",
  catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          try {
            await cloudinary.v2.uploader.destroy(img.public_id, {
              resource_type: "image",
            });
          } catch (err) {
            console.error(
              `Failed to delete image  ${img.public_id} from cloud:`,
              err,
            );
          }
        }
      }
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product and images deleted successfully",
    });
  }),
);

router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allProducts = await Product.find();

      res.status(201).json({
        success: true,
        allProducts,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);
// review create
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      // 1️⃣ Get the product
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // 2️⃣ Check if user already reviewed
      const isReviewed = product.reviews.find(
        (rev) => rev.user._id.toString() === req.user._id.toString(),
      );

      if (isReviewed) {
        // Update existing review
        product.reviews = product.reviews.map((rev) => {
          if (rev.user._id.toString() === req.user._id.toString()) {
            return {
              ...rev.toObject(),
              rating,
              comment,
              user,
            };
          }
          return rev;
        });
      } else {
        // Add new review
        product.reviews.push({
          user,
          rating,
          comment,
          productId,
        });
      }

      // 3️⃣ Recalculate average rating
      const totalRating = product.reviews.reduce(
        (acc, rev) => acc + rev.rating,
        0,
      );
      product.ratings = totalRating / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      // 4️⃣ Mark product as reviewed in order's cart
      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        {
          arrayFilters: [{ "elem._id": productId }],
          new: true,
        },
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(
        new ErrorHandler(error.message || "Something went wrong", 400),
      );
    }
  }),
);

module.exports = router;
