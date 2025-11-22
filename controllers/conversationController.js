const db = require("../db/queries");

async function getConversations(req, res) {
    try {
        const userId = req.user.id;
        const conversations = await db.getConversations(userId);
        const conversationsWithMessages = conversations.filter(convo => convo.messages.length > 0)
        return res.json(conversationsWithMessages);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getConversationById(req, res) {
    try {
        const userId = req.user.id;
        const convoId = req.params.id;

        const convoMessages = await db.getConversationById(convoId, userId);
        // await db.markMessagesAsSeen(conversation.id, userId);
        return res.json(convoMessages);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createConversation(req, res) {
    try {
        const user1Id = req.user.id;
        const { user2Id } = req.body;

        const conversation = await db.createConversation(user1Id, user2Id);
        return res.json(conversation);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getConversations,
    getConversationById,
    createConversation,
};
