const { auth } = require("express-oauth2-jwt-bearer");

module.exports = auth({
    audience: process.env.AUTH0_API_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    tokenSigningAlg: "RS256",
});
