const axios = require("axios").default;

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const path = `${process.env.AUTH0_DOMAIN}/userinfo`;
        const response = await axios.get(path, { headers: { authorization } });
        req.user = response.data;
        next();
    } catch (error) {
        const e = new Error("Failed to retrieve user's info");
        e.status = 500;
        next(e);
    }
};
