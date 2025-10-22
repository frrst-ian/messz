function requireOwnership(getResourceFn) {
    return async (req, res, next) => {
        try {
            const resourceId = parseInt(req.params.id);
            const resource = await getResourceFn(resourceId);

            if (!resource) {
                return res.status(404).redirect("/");
            }

            if (resource.userId !== req.user.id) {
                return res.status(401).redirect("/");
            }

            req.resource = resource;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };
}

module.exports = { requireOwnership };
