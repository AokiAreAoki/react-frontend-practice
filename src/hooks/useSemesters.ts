import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import semesterSlice from "../redux/slices/semesters";

export default function useSemesters(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		data,
	} = useTypedSelector(state => state.semesters);

	const abort = useRef(new AbortController());

	const fetchSemesters = useCallback(() => {
		dispatch(semesterSlice.actions.setLoading(true));

		abort.current.abort();
		abort.current = new AbortController();

		return API.getSemesters({ abort: abort.current })
			.then(context => {
				dispatch(semesterSlice.actions.setLoading(false));

				if(context.success)
					dispatch(semesterSlice.actions.setData(context.response.data));

				return context;
			});
	}, [ dispatch ]);

	useEffect(() => {
		if(upToDate)
			return;

		dispatch(semesterSlice.actions.setUpToDate(true));

		fetchSemesters().then(async ({ success, canceled }) => {
			if(!success && !canceled)
				setTimeout(() => {
					dispatch(semesterSlice.actions.setUpToDate(false));
				}, 2e3);
		});
	}, [ dispatch, data, upToDate, fetchSemesters ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	});

	return {
		loading,
		semesters: data || [],
	};
}
