// const db = require("../db/queries");

// async function getProfiles(req, res) {
//     try {
//         const profiles = await db.getProfiles();
//         res.json(profiles);
//     } catch (err) {
//         console.error("Error: ", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// async function getProfileById(req, res) {
//     try {
//         const profileId = req.params.id;
//         if (isNaN(profileId)) {
//             return res.status(400).json({ error: "400 Bad Request" });
//         }
//         const profile = await db.getProfileById(Number(profileId));
//         if (profile === null) {
//             return res.status(404).json({ error: "404 Profile Not Found" });
//         }
//         res.json(profile);
//     } catch (err) {
//         console.error("Error: ", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// async function createProfile(req, res) {
//     try {
//         const userId = req.user.id;
//         const { bio } = req.body;

//         const pfpUrl = req.file.secure_url || req.file.path;
//         // console.log("Cloudinary Upload Result:", req.file);
//         // console.log("Generated Image Path:", pfpUrl);
//         const profile = await db.createProfile(Number(userId), bio, pfpUrl);

//         res.json(profile);
//     } catch (err) {
//         console.error("Error: ", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// async function updateProfile(req, res) {
//     try {
//         const profileId = req.params.id;
//         // console.log("req.body: ", req.body);
//         const { bio } = req.body;

//         // const profile = await db.getProfileById(profileId);
//         const updateData = {};

//         const pfpUrl = req.file?.secure_url || req.file?.path;
//         if (bio !== undefined) updateData.bio = bio;
//         if (pfpUrl !== undefined) updateData.pfpUrl = pfpUrl;

//         if (Object.keys(updateData).length === 0) {
//             return res.json({ error: "No fields to update" });
//         }

//         const newProfile = await db.updateProfile(
//             Number(profileId),
//             bio,
//             pfpUrl,
//         );
//         return res.json(newProfile);
//     } catch (err) {
//         console.error("error: ", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// module.exports = {
//     getProfileById,
//     getProfiles,
//     createProfile,
//     updateProfile,
// };
