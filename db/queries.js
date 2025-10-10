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

module.exports = { createUser, getUserById, getUserByEmail };
