const prisma = require("./prisma");

async function createUser(name, email, password) {
    return await prisma.user.create({
        data: {
            fullName: name,
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

async function getConversations(userId) {
    const conversations =  await prisma.conversation.findMany({
        where: {
            userId: userId,
        },
        include: {
            participant: true,
            messages: 
                true
            
        },
        orderBy: { createdAt: "desc" },
    });

     return conversations.map(conv => ({
        ...conv,
        unseenCount: conv.messages.filter(
            m => m.senderId !== userId && !m.seen
        ).length,
        messages: conv.messages.slice(-1) 
    }));
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
                include: { sender: true },
                orderBy: { sentAt: "asc" },
            },
        },
    });
}

async function createConversation(userId, participantId) {
    const conv1 = await prisma.conversation.create({
        data: {
            userId: userId,
            participantId: participantId,
        },
    });

    await prisma.conversation.create({
        data: {
            userId: participantId,
            participantId: userId,
        },
    });

    return conv1;
}

// async function updateConversationStatus(conversationId) {
//     return await prisma.message.update({
//         where: {
//             id: conversationId,
//         },
//         data: {
//             seen: true,
//         },
//     });
// }

async function deleteConversation(conversationId) {
    return await prisma.conversation.delete({
        where: {
            id: conversationId,
        },
    });
}

async function getProfiles() {
    return await prisma.profile.findMany();
}

async function getProfileById(profileId) {
    return await prisma.profile.findUnique({
        where: {
            id: profileId,
        },
    });
}

async function createProfile(userId, displayName, bio, pfp) {
    // console.log("bio: " , bio)
    return await prisma.profile.create({
        data: {
            userId: userId,
            displayName: displayName,
            bio: bio,
            pfp: pfp,
        },
    });
}

async function updateProfile(profileId, displayName, bio, pfp) {
    console.log("profileId:", profileId);
    return await prisma.profile.update({
        where: {
            id: profileId,
        },
        data: {
            displayName: displayName,
            bio: bio,
            pfp: pfp,
        },
    });
}

async function createMessage(content, conversationId, senderId) {
    const conv = await prisma.conversation.findUnique({
        where: { id: conversationId },
        select: { userId: true, participantId: true },
    });

    const reverseConv = await prisma.conversation.findUnique({
        where: {
            userId_participantId: {
                userId: conv.participantId,
                participantId: conv.userId,
            },
        },
    });

    const message = await prisma.message.create({
        data: {
            conversationId: conversationId,
            content: content,
            senderId: senderId,
        },
        include: { sender: true, conversation: true },
    });

    if (reverseConv) {
        await prisma.message.create({
            data: {
                conversationId: reverseConv.id,
                content: content,
                senderId: senderId,
            },
        });
    }

    return message;
}

async function markMessagesAsSeen(conversationId, userId) {
    return await prisma.message.updateMany({
        where: {
            conversationId: conversationId,
            senderId: { not: userId },
            seen: false
        },
        data: { seen: true }
    });
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getConversations,
    getConversationById,
    createConversation,
    deleteConversation,
    getProfileById,
    updateProfile,
    createProfile,
    getProfiles,
    createMessage,
    markMessagesAsSeen
};
