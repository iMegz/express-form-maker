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

exports.getAllForms = async (req, res, next) => {
    try {
        const by = req.auth.payload.sub;
        const forms = await Form.find({ by }, "_id title description");
        res.status(200).json(forms);
    } catch (error) {
        next(error);
    }
};

exports.deleteForm = async (req, res, next) => {
    try {
        const id = req.params.id;
        const by = req.auth.payload.sub;
        const form = await Form.findById(id);

        // Form not found
        if (!form) {
            const err = new Error("Form not found");
            err.status = 404;
            throw err;
        }

        // Unauthorized
        if (form.by !== by) {
            const err = new Error("User not authorized to delete this form");
            err.status = 403;
            throw err;
        }

        // Delete the form
        await Form.deleteOne({ _id: id });
        res.status(200).json({ message: `${form.title} was deleted` });
    } catch (error) {
        next(error);
    }
};
