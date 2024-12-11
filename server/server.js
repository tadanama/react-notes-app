import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();
const port = 3000;

// Enable express to parse JSON data and attach it to req.body
app.use(express.json());

// Handles all request made to /notes endpoint
app.use("/notes", notesRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
