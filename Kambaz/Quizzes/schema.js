import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },
    course: { type: String }, // <--- CHANGED FROM ObjectId TO String
    questions: [
      {
        title: { type: String },
        type: {
          type: String,
          enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"],
          default: "MULTIPLE_CHOICE",
        },
        points: { type: Number, default: 0 },
        question: { type: String },
        choices: [
            { text: String, isCorrect: Boolean }
        ],
        correctAnswers: [String],
      },
    ],
    published: { type: Boolean, default: false },
    quizType: {
      type: String,
      enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED_QUIZ",
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    attempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: true },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    points: { type: Number, default: 0 },
  },
  { collection: "quizzes" }
);

export default quizSchema;