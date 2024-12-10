import { Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import Layout from "./component/Layout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/notes">
					<Route index element={addNewForm} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
