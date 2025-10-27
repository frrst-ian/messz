const db = require("../db/user_queries");

async function getUsers(req, res) {
    const userId = req.user.id;
    const { search } = req.query;

    const users = await db.getUsers(search, userId);
    return res.json(users);
}

async function getUserById(req, res) {
    const { id } = req.params;
    
    const user = await db.getUserById(id);
    return res.json(user);
}

module.exports = { getUsers, getUserById };
