const { Schema, model } = require("mongoose");

const questionTypeEnum = [
    "SHORT_ANSWER",
    "PARAGRAPH",
    "DROPDOWN",
    "MCQ",
    "EMAIL",
    "NUMBER",
    "DATE",
];

function transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}

// Question schema
const questionSchema = new Schema(
    {
        id: { type: String, required: true },
        type: { type: String, required: true, enum: questionTypeEnum },
        question: { type: String, required: true },
        required: { type: Boolean, default: false },
        dateType: { type: String, enum: ["date", "time", "datetime-local"] },
        choices: { type: [String], default: undefined },
        other: Boolean,
        maxChoices: Number,
    },
    { _id: false }
);

// Section schema
const sectionSchema = new Schema(
    {
        id: { type: String, required: true },
        title: { type: String, required: true },
        questions: [questionSchema],
    },
    { _id: false }
);

// Form schema
const formSchema = new Schema(
    {
        by: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        isPublic: { type: Boolean, default: false },
        coverImg: String,
        sections: [sectionSchema],
    },
    { toJSON: { transform } }
);

module.exports = model("Form", formSchema);
