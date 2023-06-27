import { useCallback } from "react";
import { useTypedDispatch } from "../redux";
import API from "../services/API";
import authSlice from "../redux/slices/auth";
import userSlice from "../redux/slices/user";
import studentSlice from "../redux/slices/students";
import semesterSlice from "../redux/slices/semesters";
import othersScoreSlice from "../redux/slices/othersScores";
import ownScoreSlice from "../redux/slices/ownScores";

export default function useLogout(){
	const dispatch = useTypedDispatch();

	const logout = useCallback(() => {
		API.logout({})
			.then(({ success }) => {
				if(!success)
					return;

				dispatch(authSlice.actions.setToken(null));

				dispatch(userSlice.actions.setUpToDate(false));
				dispatch(studentSlice.actions.setUpToDate(false));
				dispatch(semesterSlice.actions.setUpToDate(false));
				dispatch(ownScoreSlice.actions.setUpToDate(false));
				dispatch(othersScoreSlice.actions.setCachedStudentId(undefined));
			});
	}, [ dispatch ]);

	return logout;
}