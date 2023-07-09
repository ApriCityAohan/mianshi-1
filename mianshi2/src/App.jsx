import { Route, Routes } from "react-router-dom";
import routes from "./router/index";

function App() {
	return (
		<Routes>
			{routes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					exact={route.exact}
					element={route.element}
				/>
			))}
		</Routes>
	);
}

export default App;
