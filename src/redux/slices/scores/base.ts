/* eslint-disable no-param-reassign */
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import ScoreState from "./ScoreState";

const initialState: ScoreState = {
	upToDate: false,
	loading: true,
	semesters: [],
};

type Reducer<P> = CaseReducer<ScoreState, PayloadAction<P>>;

const setUpToDate: Reducer<ScoreState['upToDate']> = (state, { payload }) => {
	state.upToDate = payload;
};

const setLoading: Reducer<ScoreState['loading']> = (state, { payload }) => {
	state.loading = payload;
};

const setSemesters: Reducer<ScoreState['semesters']> = (state, { payload }) => {
	state.semesters = payload;
};

const baseScoreSlice = {
	name: "scores",
	initialState,
	reducers: {
		setUpToDate,
		setLoading,
		setSemesters,
	},
};

export default baseScoreSlice;