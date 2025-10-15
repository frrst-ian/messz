const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profileController");
const authenticateJwt = require("../middleware/auth");

profileRouter.get("/", authenticateJwt, profileController.getProfile);
profileRouter.post("/", authenticateJwt, profileController.createProfile);
profileRouter.put("/", authenticateJwt, profileController.updateProfile);
