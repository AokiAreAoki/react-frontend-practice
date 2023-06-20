import { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../redux";
import API from "../services/API";
import semesterSlice from "../redux/slices/semesters";

export default function useSemesters(){
	const dispatch = useTypedDispatch();
	const {
		loading,
		data,
	} = useTypedSelector(state => state.semesters);

	useEffect(() => {
		if(data)
			return;

		const abort = new AbortController();
		dispatch(semesterSlice.actions.setLoading(true));

		API.getSemesters({ abort })
			.then(async data => {
				if(data.success)
					return data;

				// Retry in a bit
				await new Promise(resolve => setTimeout(resolve, 2e3));

				return API.getSemesters({ abort });
			})
			.then(({ success, response }) => {
				if(!success)
					return;

				dispatch(semesterSlice.actions.setLoading(false));
				dispatch(semesterSlice.actions.setData(response.data));
			});

		return () => {
			abort.abort();
		};
	}, [ dispatch, data ]);

	return {
		loading,
		semesters: data || [],
	};
}
