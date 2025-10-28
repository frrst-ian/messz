const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const {
    loginValidator,
    registerValidator,
} = require("../validators/userValidator");
const upload = require("../config/cloudinary");

authRouter.post(
    "/register",
    upload.single("pfpUrl"),
    registerValidator,
    authController.postRegister,
);
authRouter.post("/login", loginValidator, authController.postLogin);

module.exports = authRouter;
