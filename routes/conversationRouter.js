const { Router } = require("express");
const conversationRouter = Router();
const authenticateJwt = require("../middleware/auth");
const conversationController = require("../controllers/conversationController");

conversationRouter.get("/", authenticateJwt, conversationController.getConversations);
conversationRouter.post("/",authenticateJwt, conversationController.createConversation);
conversationRouter.put("/",authenticateJwt, conversationController.updateConversationStatus);
conversationRouter.delete("/",authenticateJwt, conversationController.deleteConversation);

// conversationRouter.get("/:conversationId/", conversationController.getConversationById);

module.exports = conversationRouter;
