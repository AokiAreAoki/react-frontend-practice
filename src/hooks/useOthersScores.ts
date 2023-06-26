import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import othersScoreSlice from "../redux/slices/scores/others";

export default function useOthersScores(studentId?: number){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		semesters,
	} = useTypedSelector(state => state.othersScores);

	const abort = useRef(new AbortController());

	// eslint-disable-next-line no-shadow
	const fetchOthersScores = useCallback((studentId: number) => {
		dispatch(othersScoreSlice.actions.setLoading(true));

		abort.current.abort();
		abort.current = new AbortController();

		return API.getScores({
			studentId,
			abort: abort.current,
		})
			.then(context => {
				dispatch(othersScoreSlice.actions.setLoading(false));

				if(context.success)
					dispatch(othersScoreSlice.actions.setSemesters(context.response.data));

				return context;
			});
	}, [ dispatch ]);

	useEffect(() => {
		if(upToDate || studentId == null)
			return;

		dispatch(othersScoreSlice.actions.setUpToDate(true));

		fetchOthersScores(studentId).then(({ success, canceled }) => {
			if(!success && !canceled)
				setTimeout(() => {
					dispatch(othersScoreSlice.actions.setUpToDate(false));
				}, 2e3);
		});
	}, [ dispatch, fetchOthersScores, studentId, upToDate ]);

	useEffect(() => {
		if(studentId)
			fetchOthersScores(studentId);
	}, [ fetchOthersScores, studentId ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return {
		loading,
		refresh: useCallback(() => {
			if(studentId != null)
				fetchOthersScores(studentId);
		}, [ fetchOthersScores, studentId ]),
		semesters,
	};
}