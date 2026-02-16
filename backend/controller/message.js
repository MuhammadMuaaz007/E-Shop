const express = require("express");
const Messages = require("../model/messages");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../middleware/error");
const router = express.Router();

// create a new message
router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;
      if (req.files) {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        messageData.images = imageUrls;
      }
      messageData.conversation = req.body.conversationId;
      messageData.sender = req.body.sender;
      const message = new Messages({
        conversationId: messageData.conversation,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });
      await message.save();
      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.response.message, 500)) ;
    }
  }),
);

module.exports = router;
