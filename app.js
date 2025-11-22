require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const authRouter = require("./routes/authRouter");
const conversationRouter = require("./routes/conversationRouter");
const messageRouter = require("./routes/messageRouter");
const userRouter = require("./routes/userRouter");

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            const allowedOrigins = [
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:5173",
                "http://localhost:5174",
                "https://messz.onrender.com"
            ];

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
        optionsSuccessStatus: 200,
    }),
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).send(`File upload error: ${err.message}`);
    }
    res.status(500).send(err.message);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
