const express = require("express");
const {
  getGroupMessages,
  sendGroupMessage,
} = require("../controllers/groupChatController");

const router = express.Router();

router.get("/:groupId", getGroupMessages);
router.post("/", sendGroupMessage);

module.exports = router;
