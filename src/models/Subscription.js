const { Schema, model } = require("mongoose");
const transform = require("../utils/transform");

const subscriptionSchema = new Schema(
    {
        _id: { type: String, required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
    { toJSON: { transform } }
);

module.exports = model("Subscription", subscriptionSchema);
