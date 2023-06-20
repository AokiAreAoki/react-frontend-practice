/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import ScoreSummary from "../../types/ScoreSummary";

interface ScoresState extends ScoreSummary {
	upToDate: boolean
	loading: boolean
}

const initialState: ScoresState = {
	upToDate: false,
	loading: true,
	semesters: [],
};

type Reducer<P> = CaseReducer<ScoresState, PayloadAction<P>>;

const setUpToDate: Reducer<ScoresState['upToDate']> = (state, { payload }) => {
	state.upToDate = payload;
};

const setLoading: Reducer<ScoresState['loading']> = (state, { payload }) => {
	state.loading = payload;
};

const setSemesters: Reducer<ScoresState['semesters']> = (state, { payload }) => {
	state.semesters = payload;
};

const scores = createSlice({
	name: "scores",
	initialState,
	reducers: {
		setUpToDate,
		setLoading,
		setSemesters,
	},
});

export default scores;