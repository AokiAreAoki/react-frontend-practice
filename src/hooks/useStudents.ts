/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import studentSlice from "../redux/slices/scores/others";

export default function useStudents(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		students,
	} = useTypedSelector(state => state.students);

	const abort = useRef(new AbortController());

	const fetchStudents = useCallback(() => {
		dispatch(studentSlice.actions.setLoading(true));

		return API.getStudents({ abort: abort.current })
			.then(context => {
				dispatch(studentSlice.actions.setLoading(false));

				if(context.success)
					dispatch(studentSlice.actions.setSemesters(context.response.data));

				return context;
			});
	}, []);

	useEffect(() => {
		return () => {
			abort.current.abort();
		};
	}, []);

	useEffect(() => {
		if(upToDate)
			return;

		dispatch(studentSlice.actions.setUpToDate(true));
		dispatch(studentSlice.actions.setLoading(true));

		fetchStudents().then(({ success }) => {
			if(success)
				return;

			setTimeout(() => {
				dispatch(studentSlice.actions.setUpToDate(false));
			}, 2e3);
		});
	}, [ dispatch, upToDate ]);

	return {
		loading,
		refresh: fetchStudents,
		students,
	};
}