import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// All functions must be async and use await before model calls
export const createAssignment = async (assignment) => {
  const newAssignment = { ...assignment, _id: uuidv4() };
  return await model.create(newAssignment);
};

export const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });

export const updateAssignment = async (assignmentId, assignment) => 
  await model.updateOne({ _id: assignmentId }, { $set: assignment });

export const deleteAssignment = async (assignmentId) => await model.deleteOne({ _id: assignmentId });