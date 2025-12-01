import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // 1. Delete an assignment
  app.delete("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const status = await dao.deleteAssignment(aid);
    res.json(status);
  });

  // 2. Update an assignment
  app.put("/api/assignments/:aid", async (req, res) => {
    const { aid } = req.params;
    const status = await dao.updateAssignment(aid, req.body);
    res.json(status);
  });

  // 3. Create a new assignment for a course
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
    };
    const assignment = await dao.createAssignment(newAssignment);
    res.json(assignment);
  });

  // 4. Get all assignments for a course
  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    // NOTE: This call must be awaited, although model.find is awaited inside the DAO
    const assignments = await dao.findAssignmentsForCourse(cid);
    res.json(assignments);
  });
}