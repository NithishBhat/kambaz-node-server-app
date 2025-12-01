import model from "./model.js";

export default function ModulesDao() {
  const findModulesForCourse = (courseId) => {
    return model.find({ course: courseId });
  };

  const createModule = (courseId, module) => {
    // FIX: Generate a new unique ID (string) because the schema expects a String _id
    delete module._id;
    const newId = new Date().getTime().toString(); 
    return model.create({ ...module, _id: newId, course: courseId });
  };

  const deleteModule = (moduleId) => {
    return model.deleteOne({ _id: moduleId });
  };

  const updateModule = (moduleId, moduleUpdates) => {
    return model.updateOne({ _id: moduleId }, { $set: moduleUpdates });
  };

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}