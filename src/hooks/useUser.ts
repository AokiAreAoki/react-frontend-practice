import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import userSlice from "../redux/slices/user";
import useDebouncedCallback from "./useDebouncedCallback";

export default function useUser(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		data,
	} = useTypedSelector(state => state.user);

	const abort = useRef(new AbortController());

	const fetchUser = useDebouncedCallback(() => {
		abort.current.abort();
		abort.current = new AbortController();

		dispatch(userSlice.actions.setLoading(true));

		API.getUser({ abort: abort.current })
			.then(({ success, response, canceled }) => {
				dispatch(userSlice.actions.setLoading(false));

				if(success){
					dispatch(userSlice.actions.setUpToDate(true));
					dispatch(userSlice.actions.setUserData(response.data));
				} else if(!canceled)
					setTimeout(() => {
						dispatch(userSlice.actions.setUpToDate(false));
					}, 2e3);
			});
	}, 200);

	useEffect(() => {
		if(upToDate || loading)
			return;

		fetchUser();
	}, [ dispatch, fetchUser, loading, upToDate ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return {
		loading,
		refresh: fetchUser,
		user: data,
	};
}
