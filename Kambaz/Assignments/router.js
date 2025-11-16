// This imports the "database" file
import db from "../Database/assignments-su24.js";

// We use 'let' so the array is mutable
let assignments = db;

export default function AssignmentRoutes(app) {
  // 4. Delete an assignment
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    assignments = assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });

  // 3. Update an assignment
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = assignments.findIndex((a) => a._id === aid);
    if (assignmentIndex !== -1) {
      assignments[assignmentIndex] = {
        ...assignments[assignmentIndex],
        ...req.body,
      };
      res.json(assignments[assignmentIndex]);
    } else {
      res.sendStatus(404);
    }
  });

  // 2. Create a new assignment for a course
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      _id: new Date().getTime().toString(), // Create a unique ID
      course: cid,
    };
    assignments.push(newAssignment);
    res.json(newAssignment);
  });

  // 1. Get all assignments for a course
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const courseAssignments = assignments.filter((a) => a.course === cid);
    res.json(courseAssignments);
  });
}