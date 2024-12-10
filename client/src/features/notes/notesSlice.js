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
	// Return the data from the response that we got to the fulfilled reducers as the action payload
	return response.data;
});

// Define the notes slice
const notesSlice = createSlice({
	name: "note",
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchNotes.pending, (state) => {
				state.status = "Loading";
			})
			.addCase(fetchNotes.fulfilled, (state, action) => {
				state.status = "succeeded";
				// Add the fetched posts to the array
				state.notes = state.notes.concat(action.payload);
			})
			.addCase(fetchNotes.rejected, (state, action) => {
				state.status = "failed";
				// Set the error message in state
				state.error = action.error.message;
			});
	},
});

// When an async thunk is dispatched, a lifecycle is started
// It will be pending if is currently fetching the data
// After successful data fetching it will be fulfilled
// Otherwise, if an error occured it will be rejected

// Export notes reducer to include in the store
export default notesSlice.reducer;