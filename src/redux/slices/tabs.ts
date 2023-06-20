/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export interface Tab {
	key: string
	name: string
}

interface TabState {
	active: Tab['key'] | null
	list: Tab[]
}

const initialState: TabState = {
	active: null,
	list: []
};

type Reducer<P> = CaseReducer<TabState, PayloadAction<P>>;

const setActiveTab: Reducer<TabState['active']> = (state, { payload }) => {
	state.active = payload;
};

const setTabs: Reducer<TabState['list']> = (state, { payload }) => {
	state.list = payload;
};

const addTab: Reducer<Tab> = (state, { payload }) => {
	state.list.push(payload);
};

const removeTab: Reducer<Tab['key']> = (state, { payload }) => {
	state.list = state.list.filter(t => t.key === payload);
};

const tabSlice = createSlice({
	name: "tabs",
	initialState,
	reducers: {
		setActiveTab,
		setTabs,
		addTab,
		removeTab,
	},
});

export default tabSlice;