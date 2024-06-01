/* eslint-disable react/jsx-curly-brace-presence */
import CustomImage from '@components/base/Image';
import Button from '@components/form-control/Button';
import SocialButtonsGroup from '@components/form-control/SocialButtonsGroup';
import TextField from '@components/form-control/TextField';
import { Link } from 'react-router-dom';

export default function LoginScreen(): React.ReactElement {
	return (
		<main className='min-h-screen w-screen flex items-center justify-center md:justify-end md:bg-login-bg md:bg-cover'>
			<section className='bg-bgLight dark:bg-bgDark w-screen min-h-screen md:w-1/4 md:min-w-[400px] flex items-center justify-center'>
				<div className='block w-full px-lg'>
					<div className='w-40 mx-auto block dark:hidden'>
						<CustomImage src='/images/logo-black.png' />
					</div>
					<div className=' w-44 mx-auto hidden dark:block'>
						<CustomImage src='/images/logo-white.png' />
					</div>
					<h1 className='text-xl font-bold mt-12'>Entre com a sua conta</h1>
					<TextField className='mt-2' label='Email' />
					<TextField className='mt-2' label='Senha' />
					<div className='block text-right mt-2'>
						<a className='text-sm font-medium text-gray-900 dark:text-white hover:text-primary focus:text-primary' href={`/forgot-password`}>
							{' '}
							Esqueci minha senha{' '}
						</a>
					</div>
					<Button>Entrar</Button>
					<hr className='mt-xl mb-base mx-sm border-neutral-600' />
					<SocialButtonsGroup
						buttons={{
							google: {
								icon: true,
								onClick: () => console.log('Google'),
								text: '',
								color: 'light',
							},
							facebook: {
								icon: true,
								onClick: () => console.log('Facebook'),
								text: '',
								color: 'primary',
							},
							// apple: {
							// 	icon: true,
							// 	onClick: () => console.log('Apple'),
							// 	text: '',
							// 	color: 'dark',
							// },
						}}
					/>
					<div className='block text-left mt-base'>
						<p className='text-sm font-light'>
							Não tem uma conta?
							<a className='font-semibold text-primary dark:text-primary hover:text-primary-600 focus:text-primary-600' href={`/register`}>
								{' '}
								Criar agora{' '}
							</a>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
