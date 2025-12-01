import model from "./model.js";

export default function EnrollmentsDao() {
  const findAllEnrollments = () => model.find();

  const findEnrollmentsForUser = (userId) => model.find({ user: userId });

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  };

  const enrollUserInCourse = (userId, courseId) =>
    // FIX: Ensure the ID is a simple string combining user and course
    // This matches the format used in your enrollments.json ("userId-courseId")
    model.create({ _id: `${userId}-${courseId}`, user: userId, course: courseId });

  const unenrollUserFromCourse = (userId, courseId) =>
    model.deleteOne({ user: userId, course: courseId });

  const unenrollAllUsersFromCourse = (courseId) =>
    model.deleteMany({ course: courseId });

  return {
    findAllEnrollments,
    findEnrollmentsForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}