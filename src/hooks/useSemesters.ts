import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import semesterSlice from "../redux/slices/semesters";
import useDebouncedCallback from "./useDebouncedCallback";

export default function useSemesters(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		data,
	} = useTypedSelector(state => state.semesters);

	const abort = useRef(new AbortController());

	const fetchSemesters = useDebouncedCallback(() => {
		abort.current.abort();
		abort.current = new AbortController();

		dispatch(semesterSlice.actions.setLoading(true));

		API.getSemesters({ abort: abort.current })
			.then(({ success, response, canceled }) => {
				dispatch(semesterSlice.actions.setLoading(false));

				if(success){
					dispatch(semesterSlice.actions.setUpToDate(true));
					dispatch(semesterSlice.actions.setData(response.data));
				} else if(!canceled)
					setTimeout(() => {
						dispatch(semesterSlice.actions.setUpToDate(false));
					}, 2e3);

				return;
			});
	}, 200);

	useEffect(() => {
		if(upToDate || loading)
			return;

		fetchSemesters();
	}, [ dispatch, fetchSemesters, loading, upToDate ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return {
		loading,
		semesters: data || [],
	};
}
