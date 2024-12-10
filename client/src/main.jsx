import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { fetchNotes } from "./features/notes/notesSlice.js";
import "./index.css";
import App from "./App.jsx";

store.dispatch(fetchNotes());

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
