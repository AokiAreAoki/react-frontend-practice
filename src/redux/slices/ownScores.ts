/* eslint-disable no-param-reassign */
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import ScoreSummary from "../../types/ScoreSummary";

interface ScoreState extends ScoreSummary {
	upToDate: boolean
	loading: boolean
}

const initialState: ScoreState = {
	upToDate: false,
	loading: false,
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

const ownScoreSlice = createSlice({
	name: "ownScores",
	initialState,
	reducers: {
		setUpToDate,
		setLoading,
		setSemesters,
	},
});

export default ownScoreSlice;