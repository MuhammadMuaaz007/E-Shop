const mongoose = require("mongoose");
const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupon code name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
    // required: true,
  },
  maxAmount: {
    type: Number,
  },
  selectedProduct: {
    type: String,
  },
  shop: {
    type: Object,
    required: true,
  },
  selectedProduct:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
