// const { Router } = require("express");
// const profileRouter = Router();
// const profileController = require("../controllers/profileController");
// const authenticateJwt = require("../middleware/auth");
// const upload = require("../config/cloudinary");
// const db = require("../db/queries");
// const { requireOwnership } = require("../middleware/authProtection");


// profileRouter.get("/", authenticateJwt, profileController.getProfiles);
// profileRouter.get("/:id", authenticateJwt, profileController.getProfileById);
// profileRouter.post(
//     "/",
//     upload.single("pfpUrl"),
//     authenticateJwt,
//     profileController.createProfile,
// );
// profileRouter.put(
//     "/:id",
//     upload.single("pfpUrl"),
//     authenticateJwt,
//     requireOwnership(db.getProfileById),
//     profileController.updateProfile,
// );

// module.exports = profileRouter;
