import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import userSlice from "../redux/slices/user";
import useLogout from "./useLogout";

export default function useUserData(){
	const dispatch = useTypedDispatch();
	const userState = useTypedSelector(state => state.user);
	const logout = useLogout();

	useEffect(() => {
		if(userState.data)
			return;

		const abort = new AbortController();
		dispatch(userSlice.actions.setLoading(true));

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

				dispatch(userSlice.actions.setLoading(false));
				dispatch(userSlice.actions.setUserData(response.data));
			});

		return () => {
			abort.abort();
		};
	}, [ dispatch, logout, userState.data ]);

	return userState;
}
