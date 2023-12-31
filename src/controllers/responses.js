const { isObjectIdOrHexString } = require("mongoose");
const Form = require("../models/Form");
const Response = require("../models/Response");

// GET
exports.getResponses = async (req, res, next) => {
    const id = req.params.formId;
    const by = req.auth.payload.sub;

    try {
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

        // Trying to access forms of another user
        if (form.by !== by) {
            const err = new Error("Forbidden");
            err.status = 403;
            throw err;
        }

        const responses = await Response.find({ form: id });
        const result = {
            form: form.title,
            responses: responses.map((response) => {
                const mapped = response.toJSON();
                mapped.sections = mapped.sections.map((section, sIndex) => {
                    const questions = section.questions.map(
                        (question, qIndex) => {
                            return {
                                ...question,
                                title: form.sections[sIndex].questions[qIndex]
                                    .question,
                            };
                        }
                    );
                    const newSection = {
                        ...section,
                        questions,
                        title: form.sections[sIndex].title,
                    };
                    return newSection;
                });
                return mapped;
            }),
        };

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getResponseById = async (req, res, next) => {
    const id = req.params.id;
    const by = req.auth.payload.sub;

    try {
        // Invalid Id
        if (!isObjectIdOrHexString(id)) {
            const e = new Error("Invalid Id");
            e.status = 400;
            throw e;
        }

        // Get response
        const response = await Response.findById(id);

        // Response not found
        if (!response) {
            const e = new Error("Response not found");
            e.status = 404;
            throw e;
        }

        // Get form
        const form = await Form.findById(response.form);

        // Form not found
        if (!form) {
            const e = new Error("Form not found");
            e.status = 404;
            throw e;
        }

        // Trying to access forms of another user
        if (form.by !== by) {
            const err = new Error("Forbidden");
            err.status = 403;
            throw err;
        }

        const mapped = response.toJSON();
        mapped.sections = mapped.sections.map((section, sIndex) => {
            const questions = section.questions.map((question, qIndex) => {
                return {
                    ...question,
                    title: form.sections[sIndex].questions[qIndex].question,
                };
            });
            const newSection = {
                ...section,
                questions,
                title: form.sections[sIndex].title,
            };
            return newSection;
        });

        res.status(200).json(mapped);
    } catch (error) {
        next(error);
    }
};

exports.getResponsesCount = async (req, res, next) => {
    const form = req.params.formId;

    try {
        // Invalid Id
        if (!isObjectIdOrHexString(form)) {
            const e = new Error("Invalid Id");
            e.status = 400;
            throw e;
        }

        const responses = await Response.countDocuments({ form });
        res.status(200).json({ responses });
    } catch (error) {
        next(error);
    }
};

// POST
exports.addNewResponse = async (req, res, next) => {
    const data = req.body;

    try {
        const response = new Response(data);
        const result = await response.save();
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

// DELETE
exports.deleteResponse = async (req, res, next) => {
    const id = req.params.id;
    const by = req.auth.payload.sub;

    try {
        // Invalid Id
        if (!isObjectIdOrHexString(id)) {
            const e = new Error("Invalid Id");
            e.status = 400;
            throw e;
        }

        // Get response
        const response = await Response.findById(id);

        // Respone not found
        if (!response) {
            const err = new Error("Response not found");
            err.status = 404;
            throw err;
        }

        // Get response form
        const form = await Form.findById(response.form);

        // Form not found
        if (!form) {
            const err = new Error("Form not found");
            err.status = 404;
            throw err;
        }

        // Unauthorized
        if (form.by !== by) {
            const err = new Error(
                "User not authorized to delete this response"
            );
            err.status = 403;
            throw err;
        }

        // Delete the form
        await Response.deleteOne({ _id: id });
        res.status(200).json({ message: `Response was deleted` });
    } catch (error) {
        next(error);
    }
};
