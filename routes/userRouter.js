const { Router } = require("express");
const userRouter = Router();
const authenticateJwt = require("../middleware/auth");
const userController = require("../controllers/userController");
// const { requireOwnership } = require("../middleware/authProtection");

userRouter.get("/", authenticateJwt, userController.getUsers);

userRouter.get("/:id", authenticateJwt, userController.getUserById);

module.exports = userRouter;
