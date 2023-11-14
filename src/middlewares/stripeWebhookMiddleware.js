const Subscription = require("../models/Subscription");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.ENDPOINT_SECRET
        );
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    const paymentIntentSucceeded = event.data.object;

    // Handle the event
    switch (event.type) {
        case "customer.created":
            break;

        case "payment_intent.succeeded":
            // const paymentIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;

        case "checkout.session.completed":
            const { client_reference_id } = paymentIntentSucceeded;
            await Subscription.findByIdAndDelete(client_reference_id);
            await Subscription.create({ _id: client_reference_id });
            break;

        // ... handle other event types
        default:
        // console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send();
};
