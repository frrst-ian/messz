require("dotenv").config();
const express = require("express");

const app = express();

const authRouter = require("./routes/authRouter");
const conversationRouter = require("./routes/conversationRouter");
const profileRouter = require("./routes/profileRouter");
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/profile", profileRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
