import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import auth from './slices/auth';
import user from './slices/user';
import scores from './slices/scores';
import tabs from './slices/tabs';
import semesters from './slices/semesters';

const rootReducer = combineReducers({
	auth: auth.reducer,
	user: user.reducer,
	tabs: tabs.reducer,
	ownScores: scores.reducer,
	semesters: semesters.reducer,
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
