/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isLoggedIn: boolean
	token: string | null
}

const initialState: AuthState = {
	isLoggedIn: false,
	token: null,
};

type Reducer<P> = CaseReducer<AuthState, PayloadAction<P>>;

const setToken: Reducer<AuthState['token']> = (state, { payload }) => {
	state.token = payload;
	state.isLoggedIn = !!payload;
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken,
	},
});

export default authSlice;