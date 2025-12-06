import mongoose from "mongoose";
import attemptSchema from "./attemptsSchema.js";

const attemptModel = mongoose.model("QuizAttemptModel", attemptSchema);

export const createAttempt = (attempt) => attemptModel.create(attempt);

export const findAttemptsForQuiz = (quizId, userId) => 
    attemptModel.find({ quiz: quizId, user: userId }).sort({ date: -1 });