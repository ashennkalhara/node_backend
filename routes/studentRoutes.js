import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import Student from "../models/Student.js";

const router = express.Router();
const uniqueId = uuidv4(); 

// Multer storage setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uniqueId}${fileExtension}`; // UUID as filename
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, gender, attendence, facial_analysis } = req.body;
    // console.log(req.body)
     // Generate UUID for MongoDB _id
    const photo = req.file.filename; // The filename is already set as the UUID

    // Create new student with UUID as _id
    const newStudent = new Student({
      _id: uniqueId, // UUID as MongoDB _id
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      photo,
      attendence,
      facial_analysis 
    });

    await newStudent.save();

    res.json({ message: "✅ Student Registered Successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "❌ Registration Failed", details: error.message });
  }
});

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students
    res.json(students);

  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch students", details: error.message });
  }
});

export default router;
