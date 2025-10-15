const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profileController");
const authenticateJwt = require("../middleware/auth");

profileRouter.get("/", authenticateJwt, profileController.getProfiles);
profileRouter.get("/:id", authenticateJwt, profileController.getProfileById);
profileRouter.post("/", authenticateJwt, profileController.createProfile);
profileRouter.put("/:id", authenticateJwt, profileController.updateProfile);

module.exports = profileRouter;
