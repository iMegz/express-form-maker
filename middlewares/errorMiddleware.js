module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal server error";
    if (status === 500) console.log(err);
    res.status(status).send(message);
};
