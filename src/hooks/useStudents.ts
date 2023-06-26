import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import studentSlice from "../redux/slices/students";

export default function useStudents(doNotFetch = false){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		data,
	} = useTypedSelector(state => state.students);

	const abort = useRef(new AbortController());

	const fetchStudents = useCallback(() => {
		if(doNotFetch)
			return;

		dispatch(studentSlice.actions.setLoading(true));

		abort.current.abort();
		abort.current = new AbortController();

		return API.getStudents({ abort: abort.current })
			.then(context => {
				dispatch(studentSlice.actions.setLoading(false));

				if(context.success)
					dispatch(studentSlice.actions.setData(context.response.data));

				return context;
			});
	}, [ dispatch, doNotFetch ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	useEffect(() => {
		if(upToDate)
			return;

		dispatch(studentSlice.actions.setUpToDate(true));
		dispatch(studentSlice.actions.setLoading(true));

		fetchStudents()?.then(({ success, canceled }) => {
			if(!success && !canceled)
				setTimeout(() => {
					dispatch(studentSlice.actions.setUpToDate(false));
				}, 2e3);
		});
	}, [ dispatch, fetchStudents, upToDate ]);

	return {
		loading,
		refresh: fetchStudents,
		students: data || [],
	};
}