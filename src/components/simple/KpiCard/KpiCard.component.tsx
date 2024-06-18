/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import { useState, type ReactElement } from 'react';
import classNames from 'classnames';

interface More {
	title: string;
	icon: string;
	action: () => void;
}

function MoreComponent({ more }: { more: More[] }): ReactElement {
	const [showMenu, setShowMenu] = useState(false);

	const handleOnShowMenu = (): void => {
		setShowMenu((state) => !state);
	};

	return (
		// <div className='[--trigger:hover] hs-dropdown relative inline-flex'>
		// 	<button id='hs-dropdown-unstyled' type='button' className='hs-dropdown-toggle inline-flex justify-center items-center gap-x-2 [--trigger:hover]'>
		// 		Actions
		// 	</button>

		// 	<div
		// 		className='hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-60 bg-white [--trigger:hover]'
		// 		aria-labelledby='hs-dropdown-unstyled'
		// 	>
		// 		<a className='block' href='#'>
		// 			Newsletter
		// 		</a>
		// 		<a className='block' href='#'>
		// 			Purchases
		// 		</a>
		// 		<a className='block' href='#'>
		// 			Downloads
		// 		</a>
		// 		<a className='block' href='#'>
		// 			Team Account
		// 		</a>
		// 	</div>
		// </div>
		<div className='hs-dropdown relative inline-flex'>
			<button
				id='hs-dropdown-default'
				type='button'
				className='hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800'
			>
				<i className='fa-solid fa-ellipsis-vertical' />
			</button>

			<div
				className='hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full'
				aria-labelledby='hs-dropdown-default'
			>
				{more.map((item: More, index: number) => (
					<button
						key={index}
						className='flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700'
						onClick={item.action}
						type='button'
					>
						<i className={`${item.icon} mr-2`} />
						{item.title}
					</button>
				))}
			</div>
		</div>
	);
}

interface KpiCardProps {
	size?: 'large' | 'medium' | 'small';
	title?: string;
	value?: string;
	more?: More[];
	className?: string;
}
export default function KpiCardComponent({ size, title, value, more, className }: KpiCardProps): ReactElement {
	const defaultClasses =
		'p-4 m-2 min-h-44 rounded-3xl bg-bgLight-lighter dark:bg-bgDark-darker text-light dark:text-dark shadow-2xl flex flex-col items-center justify-between';
	const dynamicClasses = classNames(defaultClasses, {
		'flex-auto md:flex-none md:min-w-52 md:w-[25%]': size === 'small',
		'flex-auto md:flex-none md:w-[45%] md:min-w-80': size === 'medium',
		'flex-auto min-w-[90%]': !size || size === 'large',
	});

	return (
		<div className={`${dynamicClasses} ${className ?? ''}`}>
			<div className='flex items-center justify-between w-full'>
				<h1 className='block text-left box-border w-full font-semibold text-xl'>{title ?? 'Some Title'}</h1>
				{more ? <MoreComponent more={more} /> : ''}
			</div>
			<div className='flex items-center justify-between w-full'>
				<h3 className='block text-right box-border w-full font-bold text-4xl'>{value ?? 'Some Value'}</h3>
			</div>
		</div>
	);
}
