const Subscription = require("../models/Subscription");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.subscribe = async (req, res, next) => {
    const id = req.auth.payload.sub;
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: "http://localhost:3000/payment_sucess",
            cancel_url: "http://localhost:3000/dashboard/",
            client_reference_id: id,
            line_items: [
                {
                    price: "price_1OCGI9ByjHiiKq2tx00AtgDJ",
                    quantity: 1,
                },
            ],
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        next(error);
    }
};
