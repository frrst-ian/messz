const { Router } = require("express");
const conversationRouter = Router();
const authenticateJwt = require("../middleware/auth");
const conversationController = require("../controllers/conversationController");
const db = require("../db/queries");
const { requireOwnership } = require("../middleware/authProtection");

conversationRouter.get(
    "/",
    authenticateJwt,
    conversationController.getConversations,
);
conversationRouter.post(
    "/",
    authenticateJwt,
    conversationController.createConversation,
);
// conversationRouter.put("/:id",authenticateJwt, conversationController.updateConversationStatus);
conversationRouter.delete(
    "/",
    authenticateJwt,
    conversationController.deleteConversation,
);
conversationRouter.get(
    "/:id",
    requireOwnership(db.getConversationById),
    authenticateJwt,
    conversationController.getConversationById,
);
conversationRouter.post(
    "/:id/messages",
    requireOwnership(db.getConversationById),
    authenticateJwt,
    conversationController.createMessage,
);

module.exports = conversationRouter;
