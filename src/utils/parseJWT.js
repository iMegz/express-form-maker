/**
 * Parse token payload and check if it's valid
 * @param {string} token - JWT Token
 * @param {number} safetyMargin - Safety margin in seconds
 */
module.exports = (token, safetyMargin = 0) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    const now = ~~(Date.now() / 1000) + safetyMargin;
    const isValid = exp - now > 0;
    return { payload, isValid };
};
