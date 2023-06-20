/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { UserWithRole } from "../../types/User";

export interface UserState {
	loading: boolean
	data?: UserWithRole
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

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setLoading,
		setUserData,
	},
});

export default userSlice;