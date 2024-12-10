import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define notes initial state
const initiaState = {
	notes: [],
	status: "idle", // "loading", "succeeded" or "failed"
	error: null,
};

const POST_URL = "http://localhost:3500/notes";

// Fetch notes from API
// Can be done by using async thunk
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
	// Send a request to get all notes
	const response = await axios.get(POST_URL);
	// Return the data from the response that we got to the fulfilled reducers
	return response.data;
});

// Define the notes slice
const notesSlice = createSlice({
	name: "note",
	reducers: {},
});
