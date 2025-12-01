import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    points: Number,
    dueDate: String,
    availableFromDate: String,
    availableUntilDate: String,
    course: String,
  },
  { collection: "assignments" }
);

export default schema;