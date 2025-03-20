import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // UUID as _id
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  attendence: { type: Boolean, default: false },
  facial_analysis: { type: Object, default: "" },
  photo: { type: String, required: true }, // UUID-based filename
}, { _id: false }); // Prevent Mongoose from generating its own _id

export default mongoose.model("Student", studentSchema);
