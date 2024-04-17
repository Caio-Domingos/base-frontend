/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

function NoAuthHeader({
	onLogin
}: {
	onLogin: () => void
}): React.ReactElement {
	return (
		<div className='container mx-auto flex flex-row items-center justify-between gap-4 py-5'>
			<div className='w-5' />
			<div className='logo w-12'>
				<img src='/public/android-chrome-192x192.png' alt='' />
			</div>
			<div className='flex flex-row items-center justify-between gap-4'>
				<button type='button' onClick={onLogin}>
					<FiLogIn className='text-2xl' />
				</button>
			</div>
		</div>
	)
}
function AuthHeader({
	name,
	onLogout
}: {
	name: string
	onLogout: () => void
}): React.ReactElement {
	return (
		<div className='container mx-auto flex flex-row items-center justify-between gap-4 py-5'>
			<div className='w-28' />
			<div className='logo w-12'>
				<img src='/public/android-chrome-192x192.png' alt='' />
			</div>
			<div className='flex flex-row items-center justify-between gap-4'>
				<p>
					Olá, <strong>{name}</strong>
				</p>
				<button type='button' onClick={onLogout}>
					<FiLogOut className='text-2xl' />
				</button>
			</div>
		</div>
	)
}

export default function Header(): React.ReactElement {
	const [loggedIn, setLoggedIn] = React.useState(true)
	const [userName, setUserName] = React.useState('Caio')

	const onHandleLogin = (): void => {
		setLoggedIn(true)
	}
	const onHandleLogout = (): void => {
		setLoggedIn(false)
	}

	return (
		<div className='w-100 px-5 shadow-md'>
			{loggedIn ? (
				<AuthHeader name={userName} onLogout={onHandleLogout} />
			) : (
				<NoAuthHeader onLogin={onHandleLogin} />
			)}
		</div>
	)
}
