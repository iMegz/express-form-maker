const { isObjectIdOrHexString } = require("mongoose");
const Form = require("../models/Form");

// GET
exports.getAllForms = async (req, res, next) => {
    try {
        const by = req.auth.payload.sub;
        const forms = await Form.find({ by }, "_id title description");
        res.status(200).json(forms);
    } catch (error) {
        next(error);
    }
};

exports.getFormById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const filter = { _id: id, isPublic: true };

        // Only public forms will be visible to public users
        const isAuth = req.path.includes("unauth");
        if (!isAuth) delete filter.isPublic;

        // Invalid Id
        if (!isObjectIdOrHexString(id)) {
            const e = new Error("Invalid Id");
            e.status = 400;
            throw e;
        }

        // Get form
        const form = await Form.findOne(filter);

        // Form not found
        if (!form) {
            const e = new Error("Form not found");
            e.status = 404;
            throw e;
        }

        res.status(200).json(form);
    } catch (error) {
        next(error);
    }
};

// POST
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

// DELETE
exports.deleteForm = async (req, res, next) => {
    try {
        const id = req.params.id;
        const by = req.auth.payload.sub;

        // Invalid Id
        if (!isObjectIdOrHexString(id)) {
            const e = new Error("Invalid Id");
            e.status = 400;
            throw e;
        }

        // Get form
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
