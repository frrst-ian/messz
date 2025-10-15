require("dotenv").config();
const express = require("express");
// const authenticateJwt = require("./middleware/auth");

const app = express();

const authRouter = require("./routes/authRouter");
const conversationRouter = require("./routes/conversationRouter");

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/conversations", conversationRouter);


// app.get("/api/profile", authenticateJwt , (req, res) => {
//     return res.json("helllo fuck");
// });

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
