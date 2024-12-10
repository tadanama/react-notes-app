import { createSlice } from "@reduxjs/toolkit";

// Define notes initial state
const initiaState = {
	notes: [],
	status: "idle", // "loading", "succeeded" or "failed"
	error: null,
};

// Define the notes slice
const notesSlice = createSlice({
    name: "note",
    reducers: {

    }
})