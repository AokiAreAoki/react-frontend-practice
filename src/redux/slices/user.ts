/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { UserWithRole } from "../../types/User";

export interface UserState {
	upToDate: boolean
	loading: boolean
	data?: UserWithRole
}

const initialState: UserState = {
	upToDate: false,
	loading: false,
};

type Reducer<P> = CaseReducer<UserState, PayloadAction<P>>;

const setUpToDate: Reducer<UserState['upToDate']> = (state, { payload }) => {
	state.upToDate = payload;
};

const setLoading: Reducer<UserState['loading']> = (state, { payload }) => {
	state.loading = payload;
};

const setUserData: Reducer<UserState['data']> = (state, { payload }) => {
	state.data = payload;
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUpToDate,
		setLoading,
		setUserData,
	},
});

export default userSlice;