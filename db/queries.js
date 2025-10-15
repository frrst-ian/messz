const prisma = require("./prisma");

async function createUser(name, email, password) {
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
}

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
}

async function getUserByEmail(email) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
}

async function getConversations(userId, participantId) {
    return await prisma.conversation.findMany({
        where: {
            OR: [{ userId: userId }, { participantId: participantId }],
        },
        include: {
            user: true,
            participant: true,
            messages: {
                orderBy: { sentAt: "desc" },
                take: 1,
            },
        },
        orderBy: { createdAt: "desc" },
    });
}

async function getConversationById(userId, participantId) {
    return await prisma.conversation.findUnique({
        where: {
            userId_participantId: {
                userId: userId,
                participantId: participantId,
            },
        },
        include: {
            messages: {
                orderBy: { sentAt: "desc" },
            },
        },
    });
}

async function createConversation(userId, participantId) {
    return await prisma.conversation.create({
        data: {
            userId: userId,
            participantId: participantId,
        },
    });
}

async function updateConversationStatus(conversationId) {
    return await prisma.conversation.update({
        where: {
            id: conversationId,
        },
        data: {
            seen: true,
        },
    });
}

async function deleteConversation(conversationId) {
    return await prisma.conversation.delete({
        where: {
            id: conversationId,
        },
    });
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getConversations,
    getConversationById,
    createConversation,
    updateConversationStatus,
    deleteConversation,
};
