const express = require("express");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", getAllUsers); // Fetch all users except the logged-in user

module.exports = router;
