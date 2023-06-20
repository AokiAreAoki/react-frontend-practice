import { useCallback } from "react";
import { useTypedDispatch } from "../redux";
import ownScoreSlice from "../redux/slices/scores/own";

export default function useRefreshScores(){
	const dispatch = useTypedDispatch();

	return useCallback(() => {
		dispatch(ownScoreSlice.actions.setLoading(true));
		dispatch(ownScoreSlice.actions.setUpToDate(false));
	}, [ dispatch ]);
}