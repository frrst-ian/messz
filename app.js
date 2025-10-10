require("dotenv").config();
const express = require("express");

const app = express();


const authRouter = require("./routes/authRouter");

app.use(express.json())

app.use("/auth", authRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
