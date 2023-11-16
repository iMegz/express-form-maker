const parseJWT = require("../utils/parseJWT");

const axios = require("axios").default;

module.exports = async (req, res, next) => {
    try {
        if (!(global.token && parseJWT(global.token, 60 * 5).isValid)) {
            const data = {
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                audience: `${process.env.AUTH0_DOMAIN}/api/v2/`,
                grant_type: "client_credentials",
            };
            const response = await axios.post(
                `${process.env.AUTH0_DOMAIN}/oauth/token`,
                data,
                { headers: { "Content-Type": "application/json" } }
            );
            global.token = response.data.access_token;
            // console.log(`New token acquired in ${new Date().toLocaleString()}`);
            // console.log(`DEV_MGMT_TOKEN=${global.token}`); // For development only
        }
        next();
    } catch (error) {
        const e = new Error("Internal Server Error");
        e.status = 500;
        next(e);
    }
};
