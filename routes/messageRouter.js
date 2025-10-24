const { Router } = require("express");
const messageRouter = Router();
const authenticateJwt = require("../middleware/auth");
const messageController = require("../controllers/messageController");
// const { requireOwnership } = require("../middleware/authProtection");

messageRouter.post(
    "/",
    authenticateJwt,
    messageController.sendMessage,
);

module.exports = messageRouter;
