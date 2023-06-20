/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface StudentState {
	loading: boolean
	data?: User
}

const initialState: StudentState = {
	loading: true,
};

type Reducer<P> = CaseReducer<StudentState, PayloadAction<P>>;

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
		setLoading,
		setData,
	},
});

export default studentSlice;