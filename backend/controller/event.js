const express = require("express");
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
      const files = req.files;
      const imageObjects = files.map((file) => ({
        public_id: file.filename,
        url: `${process.env.SERVER_URL || "http://localhost:8000"}/${
          file.filename
        }`,
      }));

      const eventData = {
        ...req.body,
        images: imageObjects,
        shop: shop,
      };

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
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
  })
);

// delete event product
const fs = require("fs");
const path = require("path");

router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    const eventId = req.params.id;

    // 1️⃣ Find event first
    const event = await Event.findById(eventId);

    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }

    // 2️⃣ Delete event images from uploads folder
    if (event.images && event.images.length > 0) {
      event.images.forEach((img) => {
        const imagePath = path.join(process.cwd(), "uploads", img.public_id);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    // 3️⃣ Delete event from DB
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event and images deleted successfully",
    });
  })
);

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
  })
);

module.exports = router;
