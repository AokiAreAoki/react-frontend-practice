import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import userSlice from "../redux/slices/user";

export default function useUser(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		data,
	} = useTypedSelector(state => state.user);

	const abort = useRef(new AbortController());

	const fetchUser = useCallback(() => {
		dispatch(userSlice.actions.setLoading(true));

		abort.current.abort();
		abort.current = new AbortController();

		return API.getUser({ abort: abort.current })
			.then(context => {
				dispatch(userSlice.actions.setLoading(false));

				if(context.success)
					dispatch(userSlice.actions.setUserData(context.response.data));

				return context;
			});
	}, [ dispatch ]);

	useEffect(() => {
		if(upToDate)
			return;

		dispatch(userSlice.actions.setUpToDate(true));

		fetchUser().then(({ success, canceled }) => {
			if(!success && !canceled)
				setTimeout(() => {
					dispatch(userSlice.actions.setUpToDate(false));
				}, 2e3);
		});
	}, [ data, dispatch, fetchUser, upToDate ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	});

	return {
		loading,
		refresh: fetchUser,
		user: data,
	};
}
