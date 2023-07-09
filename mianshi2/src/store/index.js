import { createStore } from "redux";
const init = {
	userInfo: {
		username: "wwl",
		phone: "17772244456",
		password: "Wwl123#",
	},
	newUserInfo: {},
}
const reducer = (state = init, action) => {
	let newState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("userInfo", JSON.stringify(newState.userInfo));
			return newState;
		case "CHANGE_USERINFO":
			newState.userInfo = action.value;
			localStorage.setItem("userInfo", JSON.stringify(newState.userInfo));
			return newState;
		case "NEW_USERINFO":
			newState.newUserInfo = action.value;
			localStorage.setItem("newUserInfo", JSON.stringify(newState.newUserInfo));
			return newState;
		default: return state;
	}
};

const store = createStore(reducer);

export default store;
