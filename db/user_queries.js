const prisma = require("./prisma");

async function getUsers(search, userId) {
    return await prisma.user.findMany({
        where: {
            id: { not: userId },
            fullName: {
                contains: search,
                mode: "insensitive",
            },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
    });
}

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: { id: id },
        select: {
            fullName: true,
            pfpUrl: true,
            bio: true,
        },
    });
}

module.exports = { getUsers, getUserById };
