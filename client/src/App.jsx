import Header from "./component/Header";
import AddNotesForm from "./features/notes/AddNotesForm";
import NotesList from "./features/notes/NotesList";

function App() {
	return (
		<>
			<Header />
			<AddNotesForm />
			<NotesList />
		</>
	);
}

export default App;
