import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import othersScoreSlice from "../redux/slices/othersScores";
import useDebouncedCallback from "./useDebouncedCallback";

export default function useOthersScores(studentId?: number) {
	const dispatch = useTypedDispatch();
	const {
		cachedStudentId,
		loading,
		semesters,
	} = useTypedSelector(state => state.othersScores);

	const abort = useRef(new AbortController());

	// eslint-disable-next-line no-shadow
	const fetchOthersScores = useDebouncedCallback((studentId: number) => {
		if (studentId == null)
			return;

		abort.current.abort();
		abort.current = new AbortController();

		dispatch(othersScoreSlice.actions.setLoading(true));

		API.getScores({
			studentId,
			abort: abort.current,
		})
			.then(({ success, response, canceled }) => {
				dispatch(othersScoreSlice.actions.setLoading(false));

				if (success) {
					dispatch(othersScoreSlice.actions.setCachedStudentId(studentId));
					dispatch(othersScoreSlice.actions.setSemesters(response.data));
				} else if (!canceled)
					setTimeout(() => {
						dispatch(othersScoreSlice.actions.setCachedStudentId(undefined));
					}, 2e3);
			});
	}, 200);

	useEffect(() => {
		if (!studentId || studentId === cachedStudentId || loading)
			return;

		fetchOthersScores(studentId);
	}, [ cachedStudentId, dispatch, fetchOthersScores, loading, studentId ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	const refresh = useCallback(() => {
		if (studentId == null)
			return;

		fetchOthersScores(studentId);
	}, [ fetchOthersScores, studentId ]);

	return {
		loading,
		refresh,
		semesters,
	};
}