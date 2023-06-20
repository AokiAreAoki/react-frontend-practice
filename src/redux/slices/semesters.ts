/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

interface SemestersState {

}

const initialState: SemestersState = {

};

type Reducer<P> = CaseReducer<SemestersState, PayloadAction<P>>;

const someReducer: Reducer<never> = (state, { payload }) => {

};

const semesters = createSlice({
	name: "semesters",
	initialState,
	reducers: {

},
});

export default semesters;