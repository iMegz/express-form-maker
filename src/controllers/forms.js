const Form = require("../models/Form");

exports.addNewForm = async (req, res, next) => {
    const data = req.body;
    data.by = req.auth.payload.sub;
    try {
        const form = new Form(data);
        const result = await form.save();
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};
