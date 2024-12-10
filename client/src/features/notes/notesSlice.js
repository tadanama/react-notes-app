import { createSlice } from "@reduxjs/toolkit";

// Define notes initial state
const initiaState = {
	notes: [],
	status: "idle", // "loading", "succeeded" or "failed"
	error: null,
};
