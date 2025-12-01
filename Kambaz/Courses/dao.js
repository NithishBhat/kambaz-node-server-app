import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao() {
  const findAllCourses = () => model.find();
  
  const findCourseById = (courseId) => model.findById(courseId);

  // FIX 1: Async/await added to create operation
  const createCourse = async (course) => {
    const newCourse = { ...course, _id: uuidv4() };
    return await model.create(newCourse); 
  };

  // FIX 2: Async/await added to delete operation
  const deleteCourse = async (courseId) => await model.deleteOne({ _id: courseId });

  // FIX 3: Async/await added to update operation
  const updateCourse = async (courseId, courseUpdates) => 
    await model.updateOne({ _id: courseId }, { $set: courseUpdates });

  return {
    findAllCourses,
    findCourseById,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}