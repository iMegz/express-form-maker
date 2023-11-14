const router = require("express").Router();
const authUserMiddleware = require("../middlewares/authUserMiddleware");
const Form = require("../models/Form");
const Response = require("../models/Response");
const Subscription = require("../models/Subscription");

router.get("/get/sub", authUserMiddleware, async (req, res, next) => {
    const id = req.auth.payload.sub;
    try {
        const premium = await Subscription.findById(id);
        const subscription = premium ? "Premium" : "Free";
        res.status(200).json({ subscription });
    } catch (error) {
        next(error);
    }
});

router.get("/get/forms", authUserMiddleware, async (req, res, next) => {
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
});

module.exports = router;
