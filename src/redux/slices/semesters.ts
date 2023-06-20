/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Semester } from "../../types/Semester";

interface SemestersState {
	loading: boolean
	data?: Semester[]
}

const initialState: SemestersState = {
	loading: true,
};

type Reducer<P> = CaseReducer<SemestersState, PayloadAction<P>>;

const setLoading: Reducer<SemestersState['loading']> = (state, { payload }) => {
	state.loading = payload;
};
const setData: Reducer<SemestersState['data']> = (state, { payload }) => {
	state.data = payload;
};

const semesterSlice = createSlice({
	name: "semesters",
	initialState,
	reducers: {
		setLoading,
		setData,
	},
});

export default semesterSlice;