import { v4 as uuidv4 } from "uuid";

export default function CourseRoutes(app, db) {
  let { courses } = db;

  // Get all courses
  app.get("/api/courses", (req, res) => {
    res.json(courses);
  });

  // Get course by ID
  app.get("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const course = courses.find((c) => c._id === courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });

  // Create new course
  app.post("/api/courses", (req, res) => {
    const newCourse = { ...req.body, _id: uuidv4() };
    courses = [...courses, newCourse];
    res.json(newCourse);
  });

  // Update course
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    courses = courses.map((c) =>
      c._id === courseId ? { ...c, ...req.body } : c
    );
    const updatedCourse = courses.find((c) => c._id === courseId);
    res.json(updatedCourse);
  });

  // Delete course
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    courses = courses.filter((c) => c._id !== courseId);
    res.sendStatus(200);
  });
}