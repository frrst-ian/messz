const db = require("../db/queries");

async function getConversations(req, res) {
    const userId = req.user.id;
    const conversations = await db.getConversations(userId);
    console.log("convos: ", conversations);
    return res.json(conversations);
}

async function createConversation(req, res) {
    const userId = req.user.id;
    console.log("userId: ", userId);
    const { participantId } = req.body;
    console.log("participantId: ", participantId);

    const conversation = await db.createConversation(
        Number(userId),
        Number(participantId),
    );
    return res.json(conversation);
}

async function getConversationById(req, res) {
    const userId = req.user.id;
    console.log("participantId: ", participantId);

    const { participantId } = req.body;
    console.log("participantId: ", participantId);

    const conversation = await db.getConversationById(userId, participantId);
    console.log("convo: ", conversation);
    return res.json(conversation);
}

async function updateConversationStatus(req, res) {
    const userId = req.user.id;
    console.log("userId: ", userId);
    const { participantId } = req.body;
    console.log("participantId: ", participantId);

    const { seen } = req.body;

    const conversation = await db.getConversationById(
        Number(userId),
        Number(participantId),
    );
    console.log("convo: ", conversation);

    if (!seen) {
        const updatedConversaton = await db.updateConversationStatus(
            Number(conversation.id),
        );
        console.log("updated convo: ", updatedConversaton);

        return res.json(updatedConversaton);
    }

    return res.json(conversation);
}

async function deleteConversation(req, res) {
    const userId = req.user.id;
    console.log("userId: ", userId);
    const { participantId } = req.body;
    console.log("participantId: ", participantId);

    const conversation = await db.getConversationById(
        Number(userId),
        Number(participantId),
    );
    console.log("convo: ", conversation);

    await db.deleteConversation(Number(conversation.id));

    const conversations = db.getConversations(userId);
    return res.json(conversations);
}

module.exports = {
    getConversations,
    createConversation,
    getConversationById,
    updateConversationStatus,
    deleteConversation,
};
