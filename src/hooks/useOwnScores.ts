/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import scores from "../redux/slices/scores";

export default function useOwnScores(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		semesters,
	} = useTypedSelector(state => state.ownScores);

	const abort = useRef(new AbortController());

	const fetchOwnScores = useCallback(() => {
		dispatch(scores.actions.setLoading(true));

		return API.getOwnScores({ abort: abort.current })
			.then(context => {
				dispatch(scores.actions.setLoading(false));

				if(context.success)
					dispatch(scores.actions.setSemesters(context.response.data));

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

		dispatch(scores.actions.setUpToDate(true));
		dispatch(scores.actions.setLoading(true));

		fetchOwnScores().then(({ success }) => {
			if(success)
				return;

			setTimeout(() => {
				dispatch(scores.actions.setUpToDate(false));
			}, 2e3);
		});
	}, [ dispatch, upToDate ]);

	return {
		loading,
		semesters,
	};
}