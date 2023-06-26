import { useCallback } from "react";
import { useTypedDispatch } from "../redux";
import API from "../services/API";
import authSlice from "../redux/slices/auth";

export default function useLogout(){
	const dispatch = useTypedDispatch();

	const logout = useCallback(() => {
		API.logout({})
			.then(({ success }) => {
				if(success)
					dispatch(authSlice.actions.setToken(null));
			});
	}, [ dispatch ]);

	return logout;
}