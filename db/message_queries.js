const prisma = require("./prisma");

async function sendMessage(content, senderId, convoId) {
    return await prisma.message.create({
        data: {
            content: content,
            senderId: senderId,
            conversationId: convoId,
        },
    });
}

module.exports = { sendMessage };
