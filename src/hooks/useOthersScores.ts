/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import othersScoreSlice from "../redux/slices/scores/others";

export default function useOthersScores(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		semesters,
	} = useTypedSelector(state => state.othersScores);

	const abort = useRef(new AbortController());

	const fetchOthersScores = useCallback(() => {
		dispatch(othersScoreSlice.actions.setLoading(true));

		return API.getOthersScores({ abort: abort.current })
			.then(context => {
				dispatch(othersScoreSlice.actions.setLoading(false));

				if(context.success)
					dispatch(othersScoreSlice.actions.setSemesters(context.response.data));

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

		dispatch(othersScoreSlice.actions.setUpToDate(true));
		dispatch(othersScoreSlice.actions.setLoading(true));

		fetchOthersScores().then(({ success }) => {
			if(success)
				return;

			setTimeout(() => {
				dispatch(othersScoreSlice.actions.setUpToDate(false));
			}, 2e3);
		});
	}, [ dispatch, upToDate ]);

	return {
		loading,
		refresh: fetchOthersScores,
		semesters,
	};
}