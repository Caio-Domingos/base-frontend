/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/button-has-type */
import type { RootState } from '@store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './Notifications.component.css';
import { removeNotification, type Notification } from '@store/slicers/notification.slicer';

const NotificationItem = React.forwardRef(
	({ notification, onRemove }: { notification: Notification; onRemove: () => void }, reference: React.Ref<HTMLDivElement>) => (
		<div
			ref={reference}
			className={`notification relative 
			${notification.type === 'info' && 'bg-blue-100'}
			${notification.type === 'warning' && 'bg-warning-200'}
			${notification.type === 'success' && 'bg-success-200'}
			${notification.type === 'error' && 'bg-danger-200'} 
			px-6 py-4 pr-8 mb-2 z-50 rounded-xl shadow-md border flex justify-between items-center w-full overflow-hidden`}
		>
			<span className='break-words'>{notification.message}</span>
			<button onClick={onRemove} className='cursor-pointer px-2 py-1 rounded absolute top-1 right-1'>
				<i className='fa-solid fa-xmark' />
			</button>
		</div>
	)
);

export default function NotificationComponent(): React.ReactElement {
	// Get notifications from store
	const notifications = useSelector((state: RootState) => state.notification.notifications);
	const dispatch = useDispatch();

	const reference = React.useRef(null);

	return (
		<>
			<div className='absolute top-3 right-3 w-1/2 max-w-72 min-w-52'>
				<TransitionGroup>
					{notifications.map((notification) => (
						<CSSTransition key={notification.id} timeout={300} classNames='notification'>
							<NotificationItem notification={notification} onRemove={() => dispatch(removeNotification(notification.id))} ref={reference} />
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
			{/* <div className='absolute'></div> */}
			{/* <div className='absolute'></div> */}
			{/* <div className='absolute'></div> */}
		</>
	);
}
