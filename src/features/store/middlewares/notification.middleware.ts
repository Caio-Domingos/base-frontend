import type { Middleware } from '@reduxjs/toolkit';
import { type Notification, removeNotification } from '@store/slicers/notification.slicer';

const notificationMiddleware: Middleware = (store) => (next) => (action) => {
	const atualState = store.getState();
	const previousNotifications = atualState.notification.notifications;
	const result = next(action);

	const newState = store.getState();
	const newNotifications: Notification[] = newState.notification.notifications;

	for (const notification of newNotifications) {
		if (!previousNotifications.some((previousNotification: Notification) => previousNotification.id === notification.id)) {
			setTimeout(() => {
				const state = store.getState();
				if (state.notification.notifications.some((n: Notification) => n.id === notification.id)) store.dispatch(removeNotification(notification.id));
			}, notification.duration);
		}
	}
	return result;
};

export default notificationMiddleware;
