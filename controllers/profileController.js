const db = require("../db/queries");

async function getProfiles(req, res) {
    try {
        const profiles = await db.getProfiles();
        console.log("Profiles:  ", profiles);
        res.json(profiles);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getProfileById(req, res) {
    try {
        const profileId = req.params.id;
        console.log("Profile Id: ", profileId);
        if(isNaN(profileId)){
            return res.status(400).json({error: "400 Bad Request"});
        }
        const profile = await db.getProfileById(Number(profileId));
        console.log("Profile:  ", profile);
        if(profile === null) {
            return res.status(404).json({error: "404 Profile Not Found"})
        }
        res.json(profile);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createProfile(req, res) {
    try {
        const userId = 4;
        const { displayName, bio, pfp } = req.body;
        // console.log("body: ", req.body);
        const profile = await db.createProfile(Number(userId), displayName, bio, pfp);

        console.log("profile created:", profile);
        res.json(profile);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateProfile(req, res) {
    try {
        const profileId = req.params.id;
        console.log("Profile id:  ", profileId);
        const { displayName, bio, pfp } = req.body;

        // const profile = await db.getProfileById(profileId);
        const updateData = {};

        if (displayName !== undefined) updateData.displayName = displayName;
        if (bio !== undefined) updateData.bio = bio;
        if (pfp !== undefined) updateData.pfp = pfp;

        if (Object.keys(updateData).length === 0) {
            return res.json({ error: "No fields to update" });
        }

        const newProfile = await db.updateProfile(Number(profileId), displayName, bio, pfp);
        return res.json(newProfile);
    } catch (err) {
        console.error("error: ", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getProfileById,
    getProfiles,
    createProfile,
    updateProfile,
};
