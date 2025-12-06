import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    score: Number,
    answers: Object, // Stores the student's answers
    user: String,    // The ID of the student
    quiz: String,    // The ID of the quiz
    attemptNumber: { type: Number, default: 1 },
    date: { type: Date, default: Date.now },
  },
  { collection: "quiz_attempts" }
);

export default attemptSchema;