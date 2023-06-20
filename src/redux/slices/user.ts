/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
	id: number
	name: string
	surname: string | null
	email: string | null
	role: {
		id: number
		name: string
		hasGrades: boolean
		canSeeOthersGrades: boolean
		canEditGrades: boolean
		canEditSemesters: boolean
	}
}

export interface UserState {
	loading: boolean
	data?: UserData
}

const initialState: UserState = {
	loading: true,
};

type Reducer<P> = CaseReducer<UserState, PayloadAction<P>>;

const setLoading: Reducer<UserState['loading']> = (state, { payload }) => {
	state.loading = payload;
};

const setUserData: Reducer<UserState['data']> = (state, { payload }) => {
	state.data = payload;
};

const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setLoading,
		setUserData,
	},
});

export default user;