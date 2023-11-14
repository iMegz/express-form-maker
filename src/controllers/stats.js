const Form = require("../models/Form");
const Response = require("../models/Response");
const Subscription = require("../models/Subscription");

exports.getForms = async (req, res, next) => {
    const id = req.auth.payload.sub;
    try {
        const forms = await Form.find({ by: id }, "_id");
        const formsIds = forms.map(({ id }) => id);
        const responses = await Response.countDocuments({
            form: { $in: formsIds },
        });

        const formsCount = forms.length;
        const stats = { forms: formsCount, responses };
        res.status(200).json(stats);
    } catch (error) {
        next(error);
    }
};

exports.getSub = async (req, res, next) => {
    const id = req.auth.payload.sub;
    try {
        const premium = await Subscription.findById(id);
        const subscription = premium ? "Premium" : "Free";
        const start = premium?.start;

        const ONE_MONTH_IN_MS = 2_592_000_000;

        const end = start && new Date(start.getTime() + ONE_MONTH_IN_MS);

        res.status(200).json({ subscription, start, end });
    } catch (error) {
        next(error);
    }
};
