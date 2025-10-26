const db = require("../db/message_queries");

async function sendMessage(req, res) {
    try {
        const { content, convoId } = req.body;
        const userId = req.user.id;

        const message = await db.sendMessage(content, userId, convoId);
        return res.json(message);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    sendMessage,
};
