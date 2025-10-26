const db = require("../db/user_queries");

async function getUsers(req,res) {
    const { search } = req.query;

    const users = await db.getUsers(search);
    return res.json(users);
}

module.exports = { getUsers };
