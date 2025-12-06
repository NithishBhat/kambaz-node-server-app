import mongoose from "mongoose";
import quizSchema from "./schema.js";

const quizModel = mongoose.model("QuizModel", quizSchema);

export const createQuiz = (quiz) => {
    delete quiz._id; // Ensure we don't accidentally try to write an ID if passed
    return quizModel.create(quiz);
}

export const findAllQuizzes = () => quizModel.find();

export const findQuizzesForCourse = (courseId) => quizModel.find({ course: courseId }); // [cite: 25]

export const findQuizById = (quizId) => quizModel.findById(quizId);

export const updateQuiz = (quizId, quiz) => quizModel.updateOne({ _id: quizId }, { $set: quiz });

export const deleteQuiz = (quizId) => quizModel.deleteOne({ _id: quizId });