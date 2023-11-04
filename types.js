/**
 * General input properties that can be applied to HTML input elements.
 * @typedef {React.InputHTMLAttributes<HTMLInputElement>} InputProps
 */

/**
 * Event object for input element change events.
 * @typedef {React.ChangeEvent<HTMLInputElement>} InputChangeEvent
 */

/**
 * General properties that can be applied to HTML textarea elements.
 * @typedef {React.TextareaHTMLAttributes<HTMLTextAreaElement>} TextAreaProps
 */

/**
 * Event object for textarea element change events.
 * @typedef {React.ChangeEvent<HTMLTextAreaElement>} TextAreaChangeEvent
 */

/**
 * Types of questions that can be used in a form.
 * @typedef {"SHORT_ANSWER" | "PARAGRAPH" | "DROPDOWN" | "MCQ" | "EMAIL" | "NUMBER" | "DATE"} QuestionType
 */

/**
 * Types of date formats.
 * @typedef {"date" | "time" | "datetime-local"} DateType
 */

/**
 * Represents the selected and other options in multiple-choice questions.
 * @typedef {{ checked: { [key: string]: boolean }, other: string }} CheckedValue
 */

/**
 * Default question properties without the "DATE", "DROPDOWN", or "MCQ" specific properties.
 * @typedef {Object} DefaultQuestion
 * @property {string} id - The question's ID.
 * @property {QuestionType} type - The question type (excluding "DATE", "DROPDOWN", or "MCQ").
 * @property {string} question - The question text.
 * @property {boolean} [required] - Indicates if the question is required.
 * @property {DateType} [dateType] - The date format (for "DATE" type questions).
 * @property {string[]} [choices] - Available choices (for "DROPDOWN" type questions).
 * @property {boolean} [other] - Indicates if an "Other" option is available (for "DROPDOWN" type questions).
 * @property {number} [maxChoices] - Maximum number of choices that can be selected (for "MCQ" type questions).
 */

/**
 * Represents a question with a date type.
 * @typedef {Object} DateQuestion
 * @extends {DefaultQuestion}
 * @property {"DATE"} type - The question type, which is "DATE".
 * @property {DateType} dateType - The date format.
 */

/**
 * Represents a question with a dropdown type.
 * @typedef {Object} DropdownQuestion
 * @extends {DefaultQuestion}
 * @property {"DROPDOWN"} type - The question type, which is "DROPDOWN".
 * @property {string[]} choices - Available choices.
 */

/**
 * Represents a multiple-choice question.
 * @typedef {Object} MCQuestion
 * @extends {DropdownQuestion}
 * @property {number} maxChoices - Maximum number of choices that can be selected.
 */

/**
 * A question that can be part of a form.
 * @typedef {DefaultQuestion | DateQuestion | DropdownQuestion | MCQuestion} Question
 */

/**
 * Represents a section within a form.
 * @typedef {Object} Section
 * @property {string} id - The section's ID.
 * @property {string} title - The section's title.
 * @property {Question[]} questions - An array of questions in the section.
 */

/**
 * Represents a new form to be created.
 * @typedef {Object} NewForm
 * @property {string} title - The title of the new form.
 * @property {string} [description] - The optional description of the new form.
 * @property {File} [coverImg] - The optional cover image for the new form.
 * @property {boolean} [isPublic] - Indicates if the form is public.
 * @property {Section[]} sections - An array of sections within the form.
 */

/**
 * Represents a form with additional properties, including its ID and cover image URL.
 * @typedef {NewForm} Form
 * @property {string} id - The form's unique ID.
 * @property {string} coverImg - The URL of the form's cover image.
 */

/**
 * Application-specific question properties used for form applications.
 * @typedef {Object} ApplicationQuestion
 * @property {string} id - The question's ID.
 * @property {string} sectionId - The ID of the section containing the question.
 * @property {QuestionType} type - The question type.
 * @property {ApplicationAnswerType} [value] - The value of the answer to the question.
 */

/**
 * Represents a section within an application form, including its questions.
 * @typedef {Object} ApplicationSection
 * @property {string} id - The section's ID.
 * @property {ApplicationQuestion[]} questions - An array of questions within the section.
 */

/**
 * Represents an application form with sections and questions.
 * @typedef {Object} ApplicationForm
 * @property {ApplicationSection[]} sections - An array of sections within the application form.
 */

/**
 * The data type for answers in an application.
 * @typedef {string | number | CheckedValue} ApplicationAnswerType
 */
