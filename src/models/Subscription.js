const { Schema, model } = require("mongoose");
const transform = require("../utils/transform");

const subscriptionSchema = new Schema(
    {
        _id: { type: String, required: true },
        start: { type: Date, default: () => Date.now() },
    },
    { toJSON: { transform } }
);

subscriptionSchema.index(
    { start: 1 },
    { expireAfterSeconds: 30 * 24 * 60 * 60 }
);

module.exports = model("Subscription", subscriptionSchema);
