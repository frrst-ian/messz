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
    const conversations = await prisma.conversation.findMany({
        where: {
            participants: {
                some: {
                    userId,
                },
            },
        },
        include: {
            messages: {
                orderBy:{sentAt: "desc"},
                take: 1,
            },
            _count: {
                select: {
                    messages: {
                        where: {
                            seen: false,
                            senderId: { not: userId },
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return conversations.sort((a, b) => {
        b.messages[0]?.sentAt ??
            b.createdAt.getTime() - a.messages[0]?.sentAt ??
            a.createdAt.getTime();
    });
}

// async function getConversationById(conversationId) {
//     return await prisma.conversation.findUnique({
//         where: {
//             id: conversationId,
//         },
//         include: {
//             messages: {
//                 include: { sender: true },
//                 orderBy: { sentAt: "asc" },
//             },
//         },
//     });
// }

// // async function getConversationById(userId, participantId) {
// //     return await prisma.conversation.findUnique({
// //         where: {
// //             userId_participantId: {
// //                 userId: userId,
// //                 participantId: participantId,
// //             },
// //         },
// //         include: {
// //             messages: {
// //                 include: { sender: true },
// //                 orderBy: { sentAt: "asc" },
// //             },
// //         },
// //     });
// // }

// async function createConversation(userId, participantId) {
//     const conv1 = await prisma.conversation.create({
//         data: {
//             userId: userId,
//             participantId: participantId,
//         },
//     });

//     await prisma.conversation.create({
//         data: {
//             userId: participantId,
//             participantId: userId,
//         },
//     });

//     return conv1;
// }

// async function deleteConversation(conversationId) {
//     return await prisma.conversation.delete({
//         where: {
//             id: conversationId,
//         },
//     });
// }

// async function getProfiles() {
//     return await prisma.profile.findMany({
//         include: {
//             user: true,
//         },
//     });
// }

// async function getProfileById(profileId) {
//     return await prisma.profile.findUnique({
//         where: {
//             id: profileId,
//         },
//         include: {
//             user: true,
//         },
//     });
// }

// async function createProfile(userId, bio, pfpUrl) {
//     return await prisma.profile.create({
//         data: {
//             userId: userId,
//             bio: bio,
//             pfpUrl: pfpUrl,
//         },
//     });
// }

// async function updateProfile(profileId, bio, pfpUrl) {
//     console.log("profileId:", profileId);
//     return await prisma.profile.update({
//         where: {
//             id: profileId,
//         },
//         data: {
//             bio: bio,
//             pfpUrl: pfpUrl,
//         },
//     });
// }

// async function createMessage(content, conversationId, senderId) {
//     const conv = await prisma.conversation.findUnique({
//         where: { id: conversationId },
//         select: { userId: true, participantId: true },
//     });

//     const reverseConv = await prisma.conversation.findUnique({
//         where: {
//             userId_participantId: {
//                 userId: conv.participantId,
//                 participantId: conv.userId,
//             },
//         },
//     });

//     const message = await prisma.message.create({
//         data: {
//             conversationId: conversationId,
//             content: content,
//             senderId: senderId,
//         },
//         include: { sender: true, conversation: true },
//     });

//     if (reverseConv) {
//         await prisma.message.create({
//             data: {
//                 conversationId: reverseConv.id,
//                 content: content,
//                 senderId: senderId,
//             },
//         });
//     }

//     return message;
// }

// async function markMessagesAsSeen(conversationId, userId) {
//     return await prisma.message.updateMany({
//         where: {
//             conversationId: conversationId,
//             senderId: { not: userId },
//             seen: false,
//         },
//         data: { seen: true },
//     });
// }

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getConversations,
    // getConversationById,
    // createConversation,
    // deleteConversation,
    // getProfileById,
    // updateProfile,
    // createProfile,
    // getProfiles,
    // createMessage,
    // markMessagesAsSeen,
};
