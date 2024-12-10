import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
    // Define the base URL to fetch data
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    // Tags for caching
	tagTypes: ["Notes"],
	endpoints: (builder) => {},
});
