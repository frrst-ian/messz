const db = require("../db/queries");

async function getProfile(req, res) {
    try {
        const profileId = req.params;
        csonsole.log("Profile Id: ", profileId);
        const profile = await db.getProfile(Number(profileId));
        console.log("Profile:  ", profile);
        res.json(profile);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createProfile(req, res) {
    try {
        const userId = req.user.id;
        const { name, bio, pfp } = req.body;

        const profile = await db.createProfile(Number(userId), name, bio, pfp);

        console.log("profile created:", profile);
        res.json(profile);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateProfile(req, res) {
    try {
        const profileId = req.params;
        console.log("Post id:  ", profileId);
        const { displayName, bio, pfp } = req.body;

        // const profile = await db.getProfileById(profileId);
        const updateData = {};

        if (displayName !== undefined) updateData.displayName = displayName;
        if (bio !== undefined) updateData.bio = bio;
        if (pfp !== undefined) updateData.pfp = pfp;

        if (Object.keys(updateData).length === 0) {
            return res.json({ error: "No fields to update" });
        }

        const newProfile = await db.updateProfile(displayName, bio, pfp);
        return res.json(newProfile);
    } catch (err) {
        console.error("error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
     getProfile,
    createProfile,
    updateProfile,
}