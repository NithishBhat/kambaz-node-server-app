import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    // FIX: Explicitly tell Mongoose that _id is a String (to match "M101", "M102")
    // If you don't do this, Mongoose tries to cast "M101" to an ObjectId and crashes.
    _id: String, 
    name: String,
    description: String,
    course: String,
    lessons: [
      {
        _id: String,
        name: String,
        description: String,
        module: String,
      },
    ],
  },
  { collection: "modules" }
);

export default schema;