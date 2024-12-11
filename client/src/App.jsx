import { Routes, Route } from "react-router-dom";

import AddNotesForm from "./features/notes/AddNotesForm";
import NotesList from "./features/notes/NotesList";
import Layout from "./component/Layout";
import SingleNotePage from "./features/notes/SingleNotePage";
import EditNoteForm from "./features/notes/EditNoteForm";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<NotesList />} />

					<Route path="/note">
						<Route index element={<AddNotesForm />} />
						<Route path=":noteId" element={<SingleNotePage />} />
						<Route path="edit/:noteId" element={<EditNoteForm />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
