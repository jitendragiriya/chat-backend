const express = require("express");
const { isAuthenticated } = require("../Middlewares/UserAuth");
const { authUser, googleAuth } = require("../controllers/auth");
const { getAllUsers } = require("../controllers/peoples");
const { getUserconversation } = require("../controllers/chat");
const router = express.Router();

// ====================user routes ======================//
router.post("/auth/google", googleAuth);
router.get("/auth", isAuthenticated, authUser);
router.get("/people/all", isAuthenticated, getAllUsers);

//==============chating ============// 
router.get("/messages/all/:id", isAuthenticated, getUserconversation);

module.exports = router;
