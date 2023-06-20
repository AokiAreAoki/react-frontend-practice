import { store } from "../../redux";
import API from "./API";

export default new API({
	baseURL: `http://localhost:3333`,
	tokenResolver: () => store.getState().auth.token,
});