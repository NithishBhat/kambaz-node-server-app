import { v4 as uuidv4 } from "uuid";

export default function ModuleRoutes(app, db) {
  let { modules } = db;

  // Get all modules
  app.get("/api/modules", (req, res) => {
    res.json(modules);
  });

  // Get modules for a specific course
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const courseModules = modules.filter((m) => m.course === courseId);
    res.json(courseModules);
  });

  // Get module by ID
  app.get("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    const module = modules.find((m) => m._id === moduleId);
    if (module) {
      res.json(module);
    } else {
      res.status(404).json({ message: "Module not found" });
    }
  });

  // Create new module for a course
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const newModule = {
      ...req.body,
      _id: uuidv4(),
      course: courseId,
      lessons: [],
    };
    modules = [...modules, newModule];
    res.json(newModule);
  });

  // Update module
  app.put("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    modules = modules.map((m) =>
      m._id === moduleId ? { ...m, ...req.body } : m
    );
    const updatedModule = modules.find((m) => m._id === moduleId);
    res.json(updatedModule);
  });

  // Delete module
  app.delete("/api/modules/:moduleId", (req, res) => {
    const { moduleId } = req.params;
    modules = modules.filter((m) => m._id !== moduleId);
    res.sendStatus(200);
  });
}