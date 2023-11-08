const { Schema, model } = require("mongoose");
const questionTypeEnum = require("../utils/questionTypeEnum");
const transform = require("../utils/transform");

const ResponseQuestionSchema = new Schema(
    {
        id: { type: String, required: true },
        sectionId: { type: String, required: true },
        type: { type: String, enum: questionTypeEnum, required: true },
        value: { type: Schema.Types.Mixed, default: "" },
    },
    { _id: false }
);

const ResponseSectionSchema = new Schema(
    {
        id: { type: String, required: true },
        questions: [ResponseQuestionSchema],
    },
    { _id: false }
);

const ResponseSchema = new Schema(
    {
        form: { type: Schema.Types.ObjectId, ref: "Form" },
        sections: [ResponseSectionSchema],
    },
    { toJSON: { transform } }
);

module.exports = model("Response", ResponseSchema);
