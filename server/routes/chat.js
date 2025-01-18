const express = require("express");
const { getMessages, sendMessage } = require("../controllers/chatController");

const router = express.Router();

router.get("/:userId/:receiverId", getMessages);
router.post("/", sendMessage);

module.exports = router;
