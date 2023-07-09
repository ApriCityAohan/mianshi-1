import Search from "../page/search/Search";
import Login from "../page/login/Login";
import Forget from "../page/forget/Forget";
import Register from "../page/register/Register";
const routes = [
	{
		path: "/",
		exact: true,
		element: <Search />,
	},
	{
		path: "/search",
		exact: true,
		element: <Search />,
	},
	{
		path: "/login",
		exact: true,
		element: <Login />,
	},
	{
		path: "/forget",
		exact: true,
		element: <Forget />,
	},
	{
		path: "/register",
		exact: true,
		element: <Register />,
	},
];
export default routes;
