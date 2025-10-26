const prisma = require("./prisma");

async function sendMessage(content, userId, convoId) {
    return await prisma.message.create({
        data: {
            content: content,
            senderId: userId,
            conversationId: convoId,
        },
    });
}

module.exports = { sendMessage };
