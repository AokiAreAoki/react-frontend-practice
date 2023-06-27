/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Semester } from "../../types/Semester";

interface SemestersState {
	upToDate: boolean
	loading: boolean
	data?: Semester[]
}

const initialState: SemestersState = {
	upToDate: false,
	loading: false,
};

type Reducer<P> = CaseReducer<SemestersState, PayloadAction<P>>;

const setUpToDate: Reducer<SemestersState['upToDate']> = (state, { payload }) => {
	state.upToDate = payload;
};

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
		setUpToDate,
		setLoading,
		setData,
	},
});

export default semesterSlice;