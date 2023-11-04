const { connect } = require("mongoose");

module.exports = async (cb) => {
    await connect(process.env.MONGODB_URI);
    console.log("Connected to database");
    cb();
};
