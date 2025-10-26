const { Router } = require("express");
const conversationRouter = Router();
const authenticateJwt = require("../middleware/auth");
const conversationController = require("../controllers/conversationController");
// const { requireOwnership } = require("../middleware/authProtection");

conversationRouter.get(
    "/",
    authenticateJwt,
    conversationController.getConversations,
);

conversationRouter.get(
    "/:id",
    authenticateJwt,
    conversationController.getConversationById,
);


conversationRouter.post(
    "/",
    authenticateJwt,
    conversationController.createConversation,
);

// conversationRouter.delete(
//     "/",
//     authenticateJwt,
//     conversationController.deleteConversation,
// );
// conversationRouter.post(
//     "/:id/messages",
//     authenticateJwt,
//     conversationController.createMessage,
// );

module.exports = conversationRouter;
