const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/queries");

async function postRegister(req, res) {
    try {
        const { name, email, password } = req.body;

        saltedPassword = await bcrypt.hash(password, 12);

        const user = await db.createUser(name, email, password);

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        return res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("Error logging in: ", err);
        res.status(500).json({ error: "Internal Server Errror" });
    }
}

async function postLogin(req, res) {}

module.exports = { postRegister, postLogin };
