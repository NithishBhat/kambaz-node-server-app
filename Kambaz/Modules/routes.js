import ModulesDao from "./dao.js";

export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findModulesForCourse(cid);
    res.json(modules);
  };

  const createModule = async (req, res) => {
    const { cid } = req.params;
    const module = { ...req.body, course: cid };
    const newModule = await dao.createModule(cid, module);
    res.json(newModule);
  };

  const deleteModule = async (req, res) => {
    const { mid } = req.params;
    await dao.deleteModule(mid);
    res.sendStatus(200);
  };

  const updateModule = async (req, res) => {
    const { mid } = req.params;
    await dao.updateModule(mid, req.body);
    res.sendStatus(204);
  };

  // 1. GET/POST work via the Course ID (Parent)
  app.post("/api/courses/:cid/modules", createModule);
  app.get("/api/courses/:cid/modules", findModulesForCourse);

  // 2. PUT/DELETE work via the Module ID (Direct) <--- THIS FIXES THE 404/MISMATCH
  app.put("/api/modules/:mid", updateModule);
  app.delete("/api/modules/:mid", deleteModule);
}