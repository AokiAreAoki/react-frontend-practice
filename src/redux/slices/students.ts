/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface StudentState {
	upToDate: boolean
	loading: boolean
	data?: User[]
}

const initialState: StudentState = {
	upToDate: false,
	loading: false,
};

type Reducer<P> = CaseReducer<StudentState, PayloadAction<P>>;

const setUpToDate: Reducer<StudentState['upToDate']> = (state, { payload }) => {
	state.upToDate = payload;
};

const setLoading: Reducer<StudentState['loading']> = (state, { payload }) => {
	state.loading = payload;
};

const setData: Reducer<StudentState['data']> = (state, { payload }) => {
	state.data = payload;
};

const studentSlice = createSlice({
	name: "students",
	initialState,
	reducers: {
		setUpToDate,
		setLoading,
		setData,
	},
});

export default studentSlice;