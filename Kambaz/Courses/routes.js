import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error finding courses:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const createCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      const newCourse = await dao.createCourse(req.body);
      
      // Enroll the creator in the course immediately
      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      }
      
      res.json(newCourse);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
      const status = await dao.deleteCourse(courseId);
      res.json(status);
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      const status = await dao.updateCourse(courseId, courseUpdates);
      res.json(status);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const findUsersForCourse = async (req, res) => {
    try {
      const { cid } = req.params;
      const users = await enrollmentsDao.findUsersForCourse(cid);
      res.json(users);
    } catch (error) {
      console.error("Error finding users for course:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Enroll a user in a course (Page 245)
  const enrollUserInCourse = async (req, res) => {
    try {
      let { uid, cid } = req.params;
      if (uid === "current") {
        const currentUser = req.session["currentUser"];
        uid = currentUser._id;
      }
      const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
      res.json(status);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Unenroll a user from a course (Page 245)
  const unenrollUserFromCourse = async (req, res) => {
    try {
      let { uid, cid } = req.params;
      if (uid === "current") {
        const currentUser = req.session["currentUser"];
        uid = currentUser._id;
      }
      const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
      res.json(status);
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).json({ error: error.message });
    }
  };

  // Find courses for enrolled user
  const findCoursesForEnrolledUser = async (req, res) => {
    try {
      let { userId } = req.params;
      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        userId = currentUser._id;
      }
      const courses = await enrollmentsDao.findCoursesForUser(userId);
      res.json(courses);
    } catch (error) {
      console.error("Error finding courses for user:", error);
      res.status(500).json({ error: error.message });
    }
  };

  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:cid/users", findUsersForCourse);
  
  // Enrollment routes (Page 245)
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
}