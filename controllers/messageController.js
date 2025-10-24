const db = require("../db/message_queries");

async function sendMessage(req, res) {
    try {
        const userId = req.user.id;
        const { content, senderId, convoId } = req.body;
        const message = await db.sendMessage(content, senderId, convoId);
        return res.json(message);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    sendMessage,
};
