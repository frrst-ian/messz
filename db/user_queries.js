const prisma = require("./prisma");

async function getUsers(search) {
    return await prisma.user.findMany({
        where: search
            ? {
                  fullName: {
                      contains: search,
                      mode: "insensitive",
                  },
              }
            : undefined,
        orderBy: { createdAt: "desc" },
        take: 5,
    });
}

module.exports = { getUsers };
