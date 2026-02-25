const express = require("express");
const cloudinary = require("cloudinary");
// import cloudinary from 'cloudinary'
const router = express.Router();
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const upload = require("../multer");
const Event = require("../model/event");

// CREATE EVENT PRODUCT
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId } = req.body;

      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      }
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
              folder: "events",
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

      const eventData = {
        ...req.body,
        images: uploadedImages,
        shop: shop,
      };

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }),
);

router.get(
  "/get-all-events-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

      const events = await Event.find({ shopId: id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }),
);

// delete event product
const fs = require("fs");
const path = require("path");

router.delete("/delete-shop-event/:id", async (req, res) => {
  try {
    console.log("Route hit");
    const event = await Event.findById(req.params.id);
    console.log("Event:", event);

    if (event.images && event.images.length > 0) {
      for (const img of event.images) {
        if (img.public_id) {
          const result = await cloudinary.v2.uploader.destroy(img.public_id);
          console.log("Deleted:", img.public_id, result);
        }
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// get all events
router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find();
      if (!events) {
        return next(new ErrorHandler("No events found", 404));
      }
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }),
);

module.exports = router;
