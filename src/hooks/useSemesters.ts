import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import user from "../redux/slices/user";
import useLogout from "./useLogout";

export default function useSemesters(){
	const dispatch = useTypedDispatch();
	const userState = useTypedSelector(state => state.semesters);
	const logout = useLogout();

	useEffect(() => {
		if(userState.data)
			return;

		const abort = new AbortController();
		dispatch(user.actions.setLoading(true));

		API.getUser({ abort })
			.then(async data => {
				if(data.success)
					return data;

				// Retry in a bit
				await new Promise(resolve => setTimeout(resolve, 2e3));

				return API.getUser({ abort });
			})
			.then(({ success, response }) => {
				if(!success)
					return;

				dispatch(user.actions.setLoading(false));
				dispatch(user.actions.setUserData(response.data));
			});

		return () => {
			abort.abort();
		};
	}, [ dispatch, logout, userState.data ]);

	return userState;
}
