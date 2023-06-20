import { useCallback } from "react";
import { useTypedDispatch } from "../redux";
import scores from "../redux/slices/scores";

export default function useRefreshScores(){
	const dispatch = useTypedDispatch();

	return useCallback(() => {
		dispatch(scores.actions.setLoading(true));
		dispatch(scores.actions.setUpToDate(false));
	}, [ dispatch ]);
}