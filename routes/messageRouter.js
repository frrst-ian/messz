const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");

messageRouter.get("/message", messageController.getAllMessage);
messageRouter.get("/message/:messageId", messageController.getMessageById);
messageRouter.post("/message/:messageId", messageController.getMessageById);


module.exports = messageRouter;
