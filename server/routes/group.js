const express = require("express");
const {
  createGroup,
  addUser,
  removeUser,
  assignAdmin,
  leaveGroup,
  deleteGroup,
  getUserGroups,
  getGroupUsers,
} = require("../controllers/groupController");

const router = express.Router();

router.post("/create", createGroup);
router.post("/addUser", addUser);
router.post("/removeUser", removeUser);
router.post("/assignAdmin", assignAdmin);
router.post("/leave", leaveGroup);
router.delete("/delete", deleteGroup);
router.get("/userGroups/:userId", getUserGroups);
router.get("/groupUsers/:groupId", getGroupUsers);
module.exports = router;
