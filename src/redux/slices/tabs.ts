/* eslint-disable no-param-reassign */
import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { FC } from "react";

export interface Tab {
	order: number
	key: string
	name: string
}
export type RegisterTab = FC<{ order: number }>;

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
	const index = state.list.findIndex(tab => tab.key === payload.key);

	if(index === -1){
		state.list.push(payload);
		state.list.sort((a, b) => a.order - b.order);
	} else {
		state.list[index] = payload;
	}
};

const removeTab: Reducer<Tab['key']> = (state, { payload }) => {
	// state.list = state.list.filter(t => t.key === payload);
	const index = state.list.findIndex(tab => tab.key === payload);

	if(index !== -1)
		state.list.splice(index, 1);
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