import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";

// Configuring redux store
export const store = configureStore({
	reducer: {
		note: notesReducer,
	},
});
