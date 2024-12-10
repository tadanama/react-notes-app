import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

// Adapter to normalize data
// Stores data inside an object containing an array if ids and the entities object
const notesAdapter = createEntityAdapter({});

// Set notes initial state
// Initially the state is in the form of
// {
//     ids: [],         empty array
//     entities: {}     empty object
// }
const initialState = notesAdapter.getInitialState();

// Define the logic when managing notes state
const notesSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Get the notes
		getNotes: builder.query({
			// Send a get request to the <baseURL>/notes
			query: "/notes",
			// Transform the result from the query to update the initialState
			transformResponse: (responseData) => {
				return notesAdapter.setAll(initialState, responseData);
			},
			// Provide the tag to invalidate cache later on
			providesTags: (result) => [
				{ type: "Notes", id: "LIST" },
				...result.ids.map((id) => {
					type: "Notes", id;
				}),
			],
		}),
	}),
});

// Export the generated hook from apiSlice
export const { useGetNotesQuery } = notesSlice;
