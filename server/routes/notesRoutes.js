import { Router } from "express";

// Instantiate router
const router = Router();


router.get("/", (req, res) => {
	console.log("You are in /notes/ GET route");
});

router.post("/", (req, res) => {
	console.log("You are in /notes/ POST route");
});


export default router;
