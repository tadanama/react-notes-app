import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define notes initial state
const initialState = {
	notes: [],
	status: "idle", // "loading", "succeeded" or "failed"
	error: null,
};

const POST_URL = "http://localhost:3000/notes";

// Fetch notes from API
// Can be done by using async thunk
export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
	// Send a request to get all notes
	const response = await axios.get(POST_URL);
	// Return the data from the response that we got to the fulfilled reducers as the action payload
	return response.data;
});

export const addedNewNotes = createAsyncThunk(
	"note/addedNewNotes",
	async (newNote) => {
		console.log(newNote);
		// Send POST request to add new notes
		const response = await axios.post(POST_URL, newNote);
		// API returns back the newly created note
		// Send the data to the fulfilled reducer as the payload
		return response.data;
	}
);

export const updatedNote = createAsyncThunk(
	"note/updatedNote",
	async (note) => {
		// Send patch request to update the post
		// Must include the id in path parameter because the note is already exist
		const response = await axios.patch(`${POST_URL}/${note.id}`, note);
		// Return the response as the payload to the reducer
		return response.data;
	}
);

export const deletedNote = createAsyncThunk(
	"note/deletedNote",
	async (noteToDeleteId) => {
		// Get the id provided when dispatching async thunk
		const { id } = noteToDeleteId;
		// Send delete request
		const response = await axios.delete(`${POST_URL}/${id}`);
		// Return the response to the reducer
		if (response.status === 200) {
			console.log("Delete request was successful");
			return noteToDeleteId;
		}

		return `${response.status}: ${response.statusText}`;
	}
);

// Define the notes slice
const notesSlice = createSlice({
	name: "note",
	initialState,
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
				console.log("Failed to fetch notes:", state.error);
			})
			.addCase(addedNewNotes.pending, (state) => {
				state.status = "pending";
				console.log("Pending to create new note");
			})
			.addCase(addedNewNotes.fulfilled, (state, action) => {
				// Add the new post received as the action payload to the notes state
				console.log(action.payload);
				state.status = "succeeded";
				state.notes.push(action.payload);
			})
			.addCase(addedNewNotes.rejected, (state, action) => {
				state.status = "failed";
				// Set the error message in state
				state.error = action.error.message;
				console.log("Failed to create new note", action.error.message);
			})
			.addCase(updatedNote.fulfilled, (state, action) => {
				console.log("Update fulfilled");
				if (!action.payload.id) {
					console.log("Failed to update:", action.payload);
					return;
				}

				// Get the id of the newly updated note
				const { id } = action.payload;

				// Filter the notes that did not update
				const notes = state.notes.filter((note) => note.id !== id);

				// Update the state
				// Spread the array of objects that is not updated and add updated object
				state.notes = [...notes, action.payload];
			})
			.addCase(deletedNote.fulfilled, (state, action) => {
				state.status = "succeeded";
				if (!action.payload.id) {
					console.log("Failed to delete note");
					console.log(action.payload);
					return;
				}

				// Get the id of the deleted post give from async thunk
				const { id } = action.payload;

				// Filter the notes away from the deleted post by using it's id
				const fileredNote = state.notes.filter((note) => note.id !== id);
				state.notes = fileredNote;
			});
	},
});

// When an async thunk is dispatched, a lifecycle is started
// It will be pending if is currently fetching the data
// After successful data fetching it will be fulfilled
// Otherwise, if an error occured it will be rejected

// Selectors
export const selectAllNotes = (state) => state.note.notes; // Get all notes
export const selectNotesStatus = (state) => state.note.status; //Get the status
export const selectError = (state) => state.note.error; // Get the error
// export const selectNoteById = (state, noteId) =>
// 	state.note.notes.find((note) => note.id === noteId); //! Get a specific note by id (NOT WORKING)

// Export notes reducer to include in the store
export default notesSlice.reducer;
