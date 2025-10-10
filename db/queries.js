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

module.exports = { createUser };
