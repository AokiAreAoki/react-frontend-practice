import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import studentSlice from "../redux/slices/students";
import useDebouncedCallback from "./useDebouncedCallback";

export default function useStudents(doNotFetch = false) {
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		data,
	} = useTypedSelector(state => state.students);

	const abort = useRef(new AbortController());

	const fetchStudents = useDebouncedCallback(() => {
		if (doNotFetch)
			return;

		abort.current.abort();
		abort.current = new AbortController();

		dispatch(studentSlice.actions.setLoading(true));

		API.getStudents({ abort: abort.current })
			.then(({ success, response, canceled }) => {
				dispatch(studentSlice.actions.setLoading(false));

				if (success) {
					dispatch(studentSlice.actions.setUpToDate(true));
					dispatch(studentSlice.actions.setData(response.data));
				} else if (!canceled)
					setTimeout(() => {
						dispatch(studentSlice.actions.setUpToDate(false));
					}, 2e3);
			});
	}, 200);

	useEffect(() => {
		if (upToDate || loading)
			return;

		fetchStudents();
	}, [ dispatch, fetchStudents, loading, upToDate ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return {
		loading,
		refresh: fetchStudents,
		students: data || [],
	};
}