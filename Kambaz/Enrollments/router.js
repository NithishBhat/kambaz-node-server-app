import db from "../Database/enrollments.js";
let enrollments = db; // Use 'let' to make it mutable

export default function EnrollmentRoutes(app) {
  // 1. Get all enrollments for a specific user
  app.get("/api/users/:uid/enrollments", (req, res) => {
    const { uid } = req.params;
    const userEnrollments = enrollments.filter((e) => e.user === uid);
    res.json(userEnrollments);
  });

  // 2. Enroll a user in a course
  app.post("/api/enrollments", (req, res) => {
    // The client will send { user, course } in the body
    const { user, course } = req.body;
    const newEnrollment = {
      _id: new Date().getTime().toString(),
      user,
      course,
    };
    enrollments.push(newEnrollment);
    res.json(newEnrollment); // Send the new enrollment back
  });

  // 3. Unenroll a user from a course
  app.delete("/api/enrollments", (req, res) => {
    // The client will send { user, course } in the body
    const { user, course } = req.body;
    enrollments = enrollments.filter(
      (e) => !(e.user === user && e.course === course)
    );
    res.sendStatus(200);
  });
}