/* eslint-disable unicorn/prefer-spread */
import { configureStore } from '@reduxjs/toolkit';
import defaultSlicer from './slicers/_.slicer';
import notificationMiddleware from './middlewares/notification.middleware';
import notificationSlicer from './slicers/notification.slicer';

export const store = configureStore({
	reducer: {
		default: defaultSlicer,
		notification: notificationSlicer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notificationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
