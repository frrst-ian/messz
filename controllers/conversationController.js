const db = require("../db/queries");

// add error handling later - id validaton
async function getConversations(req, res) {
    try {
        const userId = req.user.id;
        const conversations = await db.getConversations(userId);
        // console.log("convos: ", conversations);
        return res.json(conversations);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createConversation(req, res) {
    try {
        const userId = req.user.id;
        // console.log("userId: ", userId);
        const { participantId } = req.body;
        // console.log("participantId: ", participantId);

        const existing = await db.getConversationById(userId, participantId);
        if (existing) {
            return res.json(existing);
        }

        const conversation = await db.createConversation(
            Number(userId),
            Number(participantId),
        );
        return res.json(conversation);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getConversationById(req, res) {
    try {
        const userId = req.user.id;

        const participantId = req.query.participantId;
        req.params.id = participantId;

        // console.log("participantId: ", participantId);


        const conversation = await db.getConversationById(
            Number(userId),
            Number(participantId),
        );
        await db.markMessagesAsSeen(conversation.id, userId);
        // console.log("convo: ", conversation);
        return res.json(conversation);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteConversation(req, res) {
    try {
        const userId = req.user.id;
        // console.log("userId: ", userId);
        const { participantId } = req.body;
        // console.log("participantId: ", participantId);

        const conversation = await db.getConversationById(
            Number(userId),
            Number(participantId),
        );
        console.log("convo: ", conversation);

        await db.deleteConversation(Number(conversation.id));

        const conversations = await db.getConversations(userId);
        return res.json(conversations);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createMessage(req, res) {
    try {
        const { content } = req.body;
        const senderId = req.user.id;

        const conversationId = req.params.id;

        const message = await db.createMessage(
            content,
            Number(conversationId),
            Number(senderId),
        );

        return res.status(201).json(message);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getConversations,
    createConversation,
    getConversationById,
    deleteConversation,
    createMessage,
};
