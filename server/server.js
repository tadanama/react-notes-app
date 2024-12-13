import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const port = 3000;

// Enable express to parse JSON data and attach it to req.body
app.use(express.json());

// Allow request from frontend
app.use(cors());

// Handles all request made to /notes endpoint
app.use("/notes", notesRoutes);

// Handles all request made to /auth endpoint
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
