import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import ownScoreSlice from "../redux/slices/scores/own";

export default function useOwnScores(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		semesters,
	} = useTypedSelector(state => state.ownScores);

	const abort = useRef(new AbortController());

	const fetchOwnScores = useCallback(() => {
		dispatch(ownScoreSlice.actions.setLoading(true));

		abort.current.abort();
		abort.current = new AbortController();

		return API.getOwnScores({ abort: abort.current })
			.then(context => {
				dispatch(ownScoreSlice.actions.setLoading(false));

				if(context.success)
					dispatch(ownScoreSlice.actions.setSemesters(context.response.data));

				return context;
			});
	}, [ dispatch ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	useEffect(() => {
		if(upToDate)
			return;

		dispatch(ownScoreSlice.actions.setUpToDate(true));
		dispatch(ownScoreSlice.actions.setLoading(true));

		fetchOwnScores().then(({ success, canceled }) => {
			if(!success && !canceled)
				setTimeout(() => {
					dispatch(ownScoreSlice.actions.setUpToDate(false));
				}, 2e3);
		});
	}, [ dispatch, fetchOwnScores, upToDate ]);

	return {
		loading,
		refresh: fetchOwnScores,
		semesters,
	};
}