import { configureStore } from '@reduxjs/toolkit';
import defaultSlicer from './slicers/_.slicer';

export const store = configureStore({
	reducer: {
		default: defaultSlicer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
