import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

app.get("/api/users/:uid/enrollments", async (req, res) => {
    const { uid } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(uid); // ✅ CORRECT: uses the variable 'uid'
    res.json(enrollments);
  });
  // 2. Enroll a user in a course
  app.post("/api/enrollments", async (req, res) => {
    const { user, course } = req.body;
    const newEnrollment = await dao.enrollUserInCourse(user, course);
    res.json(newEnrollment);
  });

// 3. Unenroll a user from a course (UPDATED)
  app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    const { unenrollUserFromCourse } = dao; // Destructure the function from dao
    await unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  });
}