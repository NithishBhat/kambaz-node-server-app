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

  // 3. Unenroll a user from a course
  app.delete("/api/enrollments", async (req, res) => {
    const { user, course } = req.body;
    await dao.unenrollUserFromCourse(user, course);
    res.sendStatus(200);
  });
}