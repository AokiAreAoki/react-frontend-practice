import { useCallback, useEffect, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import ownScoreSlice from "../redux/slices/ownScores";
import useDebouncedCallback from "./useDebouncedCallback";

export default function useOwnScores(){
	const dispatch = useTypedDispatch();
	const {
		upToDate,
		loading,
		semesters,
	} = useTypedSelector(state => state.ownScores);

	const abort = useRef(new AbortController());

	const fetchOwnScores = useDebouncedCallback(() => {
		abort.current.abort();
		abort.current = new AbortController();

		dispatch(ownScoreSlice.actions.setLoading(true));

		API.getOwnScores({ abort: abort.current })
			.then(({ success, response, canceled }) => {
				dispatch(ownScoreSlice.actions.setLoading(false));

				if(success){
					dispatch(ownScoreSlice.actions.setUpToDate(true));
					dispatch(ownScoreSlice.actions.setSemesters(response.data));
				} else if(!canceled)
					setTimeout(() => {
						dispatch(ownScoreSlice.actions.setUpToDate(false));
					}, 2e3);
			});
	}, 200);

	useEffect(() => {
		if(upToDate || loading)
			return;

		fetchOwnScores();
	}, [ dispatch, fetchOwnScores, loading, upToDate ]);

	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			abort.current.abort();
		};
	}, []);

	return {
		loading,
		refresh: fetchOwnScores,
		semesters,
	};
}