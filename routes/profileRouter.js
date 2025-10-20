const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profileController");
const authenticateJwt = require("../middleware/auth");
const upload = require("../config/cloudinary");

profileRouter.get("/", authenticateJwt, profileController.getProfiles);
profileRouter.get("/:id", authenticateJwt, profileController.getProfileById);
profileRouter.post(
    "/",
    upload.single('pfpUrl'),
    authenticateJwt,
    profileController.createProfile,
);
profileRouter.put("/:id", authenticateJwt, profileController.updateProfile);

module.exports = profileRouter;
