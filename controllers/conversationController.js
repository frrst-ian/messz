const db = require("../db/queries");

// add error handling later - id validaton

async function getConversations(req, res) {
   try {const userId = req.user.id;
        const conversations = await db.getConversations(userId);
        console.log("convos: ", conversations);
        return res.json(conversations);} catch(err) { console.error("Error: " , err) ; res.status(500).json({error: "Internal Server Error"})}
}

async function createConversation(req, res) {
   try { const userId = req.user.id;
       console.log("userId: ", userId);
       const { participantId } = req.body;
       console.log("participantId: ", participantId);
   
       const conversation = await db.createConversation(
           Number(userId),
           Number(participantId),
       );
       return res.json(conversation);} catch(err) { console.error("Error: " , err) ; res.status(500).json({error: "Internal Server Error"})}
}

async function getConversationById(req, res) {
try     {const userId = req.user.id;
        console.log("participantId: ", participantId);
    
        const { participantId } = req.body;
        console.log("participantId: ", participantId);
    
        const conversation = await db.getConversationById(userId, participantId);
        console.log("convo: ", conversation);
        return res.json(conversation);}catch(err) { console.error("Error: " , err) ; res.status(500).json({error: "Internal Server Error"})}

async function updateConversationStatus(req, res) {
 try {    const userId = req.user.id;
    console.log("userId: ", userId);
    const { participantId } = req.body;
    console.log("participantId: ", participantId);

    const { seen } = req.body;

    const conversation = await db.getConversationById(
        Number(userId),
        Number(participantId),
    );
    console.log("convo: ", conversation);

    if (!seen) {
        const updatedConversaton = await db.updateConversationStatus(
            Number(conversation.id),
        );
        console.log("updated convo: ", updatedConversaton);

        return res.json(updatedConversaton);
    }

    return res.json(conversation);} catch(err) { console.error("Error: " , err) ; res.status(500).json({error: "Internal Server Error"})}
}

async function deleteConversation(req, res) {
try {    const userId = req.user.id;
    console.log("userId: ", userId);
    const { participantId } = req.body;
    console.log("participantId: ", participantId);

    const conversation = await db.getConversationById(
        Number(userId),
        Number(participantId),
    );
    console.log("convo: ", conversation);

    await db.deleteConversation(Number(conversation.id));

    const conversations = db.getConversations(userId);
    return res.json(conversations);}catch(err) { console.error("Error: " , err) ; res.status(500).json({error: "Internal Server Error"})}
}

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
    getConversations,
    createConversation,
    getConversationById,
    updateConversationStatus,
    deleteConversation,
    getProfile,
    createProfile,
    updateProfile,
};
