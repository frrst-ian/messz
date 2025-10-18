const passport = require("../config/passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function postRegister(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const messages = errors.array().map((err) => err.msg);

            return res.status(400).json({
                errors: messages,
            });
        }

        const { name, email, password } = req.body;

        saltedPassword = await bcrypt.hash(password, 12);

        const user = await db.createUser(name, email, saltedPassword);

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
        if(err.code === "P2002" && err.meta?.target?.includes("email")) {
            return res.status(400).json({
                errors: ['Email already exist']
            })
        }
        console.error("Registration err:  ", err);
        res.status(500).json({ error: "Internal Server Errror" });
    }
}

async function postLogin(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: "Validation failed",
                details: errors.array(),
            });
        }

        passport.authenticate(
            "local",
            { session: false },
            (err, user, info) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ error: "Invalid email or password" });
                }

                if (!user) {
                    return res.status(401).json({
                        error: info?.message || "Invalid email or password",
                    });
                }

                const token = jwt.sign(
                    { userId: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" },
                );

                return res.json({
                    token,
                    user: { id: user.id, name: user.name, email: user.email },
                });
            },
        )(req, res);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { postRegister, postLogin };
