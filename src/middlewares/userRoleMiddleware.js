const axios = require("axios").default;

module.exports = async (req, res, next) => {
    try {
        const id = req.auth.payload.sub;
        const path = `${process.env.AUTH0_DOMAIN}/api/v2/users/${id}/roles`;
        const authorization = `Bearer ${req.mgmtToken}`;
        const response = await axios.get(path, { headers: { authorization } });
        const roles = response.data;
        req.roles = roles;
        next();
    } catch (error) {
        const e = new Error("Failed to retrieve user's roles");
        e.status = 500;
        next(e);
    }
};
