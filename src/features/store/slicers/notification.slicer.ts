/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
	id: string;
	message: string;
	type: 'error' | 'info' | 'success' | 'warning';
	read: boolean;
	duration: number;
}

export interface NotificationsState {
	notifications: Notification[];
}

export const initialState: NotificationsState = {
	notifications: [],
};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification: (state: NotificationsState, action: PayloadAction<Omit<Notification, 'id' | 'read'>>) => {
			const newNotification: Notification = {
				id: uuidv4(),
				message: action.payload.message,
				type: action.payload.type ?? 'info',
				read: false,
				duration: action.payload.duration ?? 5000,
			};
			state.notifications.push(newNotification);
		},
		removeNotification: (state: NotificationsState, action: PayloadAction<string>) => {
			state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
		},
	},
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
