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

module.exports = { getUsers };
