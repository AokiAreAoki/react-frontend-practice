/* eslint-disable no-param-reassign */
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import ScoreSummary from "../../types/ScoreSummary";

interface ScoreState extends ScoreSummary {
	cachedStudentId?: number
	loading: boolean
}

const initialState: ScoreState = {
	loading: false,
	semesters: [],
};

type Reducer<P> = CaseReducer<ScoreState, PayloadAction<P>>;

const setStudentId: Reducer<ScoreState['cachedStudentId']> = (state, { payload }) => {
	state.cachedStudentId = payload;
};

const setLoading: Reducer<ScoreState['loading']> = (state, { payload }) => {
	state.loading = payload;
};

const setSemesters: Reducer<ScoreState['semesters']> = (state, { payload }) => {
	state.semesters = payload;
};

const othersScoreSlice = createSlice({
	name: "othersScores",
	initialState,
	reducers: {
		setCachedStudentId: setStudentId,
		setLoading,
		setSemesters,
	},
});

export default othersScoreSlice;