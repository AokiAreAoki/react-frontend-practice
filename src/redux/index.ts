import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from "redux-persist/lib/storage";

import authSlice from './slices/auth';
import userSlice from './slices/user';
import tabSlice from './slices/tabs';
import semesterSlice from './slices/semesters';
import ownScoreSlice from './slices/scores/own';
import othersScoreSlice from './slices/scores/others';

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	user: userSlice.reducer,
	tabs: tabSlice.reducer,
	semesters: semesterSlice.reducer,
	ownScores: ownScoreSlice.reducer,
	othersScores: othersScoreSlice.reducer,
});

const persistedReducer = persistReducer({
	key: 'root',
	storage,
	whitelist: [
		'auth',
	],
}, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useTypedDispatch = () => useDispatch<RootDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
