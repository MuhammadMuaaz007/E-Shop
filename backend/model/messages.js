const mongoose = require("mongoose");
const conversation = require("./conversation");

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: String,
    },
    sender: {
      type: String,
    },
    images: [{
      type: String,
    },],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Message", messageSchema);
