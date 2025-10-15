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

async function getProfile(profileId) {
    return await prisma.profile.findUnique({
        where: {
            id: profileId,
        },
    });
}

async function createProfile(userId, displayName, bio, pfp) {
    return await prisma.profile.create({
        data: {
            userId:userId,
            displayName: displayName,
            bio: bio,
            pfp: pfp,
        },
    });
}

async function updateProfile(profileId, displayName, bio, pfp) {
    return await prisma.profile.update({
        where: {
            id: profileId,
        },
        data: {
            id: profileId,
            displayName: displayName,
            bio: bio,
            pfp: pfp,
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
    getProfile,
    updateProfile,
    createProfile,
};
