import { createEntityAdapter } from "@reduxjs/toolkit";

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