const prisma = require("./prisma");

async function createUser(name, email, password, bio, pfpUrl) {
    return await prisma.user.create({
        data: {
            fullName: name,
            email: email,
            password: password,
            bio: bio,
            pfpUrl: pfpUrl,
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
                orderBy: { sentAt: "desc" },
                take: 1,
                include: {
                    sender: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                        },
                    },
                },
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
            participants: {
                where: {
                    userId: { not: userId },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            pfpUrl: true,
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
        const aTime = a.messages[0]?.sentAt?.getTime() ?? a.createdAt.getTime();
        const bTime = b.messages[0]?.sentAt?.getTime() ?? b.createdAt.getTime();
        return bTime - aTime;
    });
}

async function getConversationById(convoId, userId) {
    const conversation = await prisma.conversation.findFirst({
        where: {
            id: convoId,
            participants: {
                some: {
                    userId: userId,
                },
            },
        },
        include: {
            messages: {
                include: {
                    sender: {
                        select: {
                            id: true,
                            email: true,
                            pfpUrl: true,
                        },
                    },
                },
                orderBy: { sentAt: "asc" },
            },
            participants: {
                where: {
                    userId: { not: userId },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            pfpUrl: true,
                        },
                    },
                },
            },
        },
    });

    return conversation;
}

async function createConversation(user1Id, user2Id) {
    const existingConvo = await prisma.conversation.findFirst({
        where: {
            AND: [
                { participants: { some: { userId: user1Id } } },
                { participants: { some: { userId: user2Id } } },
            ],
        },
        include: {
            messages: {
                include: {
                    sender: {
                        select: {
                            id: true,
                            email: true,
                            pfpUrl: true,
                        },
                    },
                },
                orderBy: { sentAt: "asc" },
            },
            participants: {
                where: {
                    userId: { not: user1Id },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            pfpUrl: true,
                        },
                    },
                },
            },
        },
    });

    if (existingConvo) {
        return existingConvo;
    } else {
        return await prisma.conversation.create({
            data: {
                participants: {
                    create: [{ userId: user1Id }, { userId: user2Id }],
                },
            },
        });
    }
}

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
    getConversationById,
    createConversation,
    // markMessagesAsSeen,
};
