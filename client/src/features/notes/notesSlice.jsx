import { createEntityAdapter } from "@reduxjs/toolkit";

// Adapter to normalize data
// Stores data inside an object containing the an array if ids and the entities
const notesAdapter = createEntityAdapter({});