import { useCallback } from "react";
import { useTypedDispatch } from "../redux";
import API from "../services/API";
import authSlice from "../redux/slices/auth";

export default function useLogout(){
	const dispatch = useTypedDispatch();

	const logout = useCallback(() => {
		const abort = new AbortController();

		API.logout({ abort })
			.then(({ success }) => {
				if(success)
					dispatch(authSlice.actions.setToken(null));
			});

		return () => {
			abort.abort();
		};
	}, [ dispatch ]);

	return logout;
}