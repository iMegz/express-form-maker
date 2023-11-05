const { Schema, model } = require("mongoose");
const questionTypeEnum = require("../utils/questionTypeEnum");

const ResponseQuestionSchema = new Schema({
    id: { type: String, required: true },
    sectionId: { type: String, required: true },
    type: { type: String, enum: questionTypeEnum, required: true },
    value: { type: Schema.Types.Mixed, default: "" },
});

const ResponseSectionSchema = new Schema({
    id: { type: String, required: true },
    questions: [ResponseQuestionSchema],
});

const ResponseSchema = new Schema({
    form: { type: Schema.Types.ObjectId, ref: "Form" },
    sections: [ResponseSectionSchema],
});

module.exports = model("Response", ResponseSchema);
