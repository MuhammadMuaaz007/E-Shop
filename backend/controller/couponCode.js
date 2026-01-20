const express = require("express");
const CouponCode = require("../model/couponCode");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");

// Create coupon Code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExist = await CouponCode.find({
        name: req.body.name,
      });
      if (isCouponCodeExist.length !== 0) {
        return next(new ErrorHandler("coupon Code already exist!", 400));
      }
      const couponCode = await CouponCode.create(req.body);
      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }),
);

// get all coupon codes of shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({
        "shop._id": req.params.id,
      });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }),
);

// get single coupon code
router.get(
  "/get-single-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const coupon = await CouponCode.findById(id).catch((err) => {
        return next(new ErrorHandler("Coupon Id is invalid", 400));
      });
      if (!coupon) {
        return next(new ErrorHandler("Coupon not found", 404));
      }
      res.status(201).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }),
);
// update coupon code
router.put(
  "/update-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const coupon = await CouponCode.findById(req.params.id);

    if (!coupon) {
      return next(new ErrorHandler("Coupon not found", 404));
    }

    coupon.name = req.body.name;
    coupon.value = req.body.value;
    coupon.minAmount = req.body.minAmount;
    coupon.maxAmount = req.body.maxAmount;
    coupon.selectedProduct = req.body.selectedProduct;

    await coupon.save();

    res.status(200).json({
      success: true,
      coupon,
    });
  }),
);

// delete coupon code
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const coupon = await CouponCode.findByIdAndDelete(id).catch((err) => {
        return next(new ErrorHandler("Coupon Id is invalid", 400));
      });
      if (!coupon) {
        return next(new ErrorHandler("Coupon not found", 404));
      }
      res.status(201).json({
        success: true,
        message: "Coupon deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }),
);
// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name } = req.params;
      const couponCode = await CouponCode.findOne({ name });
      
      if (!couponCode) {
        return next(new ErrorHandler("Coupon Code does not exist!", 404));
      }
      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }),
);

module.exports = router;
