/* eslint-disable react/jsx-curly-brace-presence */
import CustomImage from '@components/base/Image';
import Button from '@components/form-control/Button';
import SocialButtonsGroup from '@components/form-control/SocialButtonsGroup';
import TextField from '@components/form-control/TextField';
import { useEffect, useMemo } from 'react';
import LoginHandler from './Login.handler';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';

export default function LoginScreen(): React.ReactElement {
	const location = useLocation();

	useEffect(() => {
		window.HSStaticMethods.autoInit();
	}, [location.pathname]);


	const handler = useMemo(() => new LoginHandler(), []);
	const form = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			console.log(values);
			try {
				const response = await handler.loginWithEmailAndPassword(values.email, values.password);
				console.log('onSubmit response', response);
			} catch (error: any) {
				console.error(error);
			}
		},
		onReset: () => {
			form.resetForm();
		},
	});

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
					<TextField className='mt-2' label='Email' type='email' value={form.values.email} onChange={form.handleChange} />
					<TextField className='mt-2' label='Senha' password name='password' value={form.values.password} onChange={form.handleChange} />
					<div className='block text-right mt-2'>
						<a className='text-sm font-medium text-gray-900 dark:text-white hover:text-primary focus:text-primary' href={`/forgot-password`}>
							{' '}
							Esqueci minha senha{' '}
						</a>
					</div>
					<Button onClick={form.handleSubmit} disabled={!form.isValid || !form.dirty}>
						Criar
					</Button>
					<hr className='mt-xl mb-base mx-sm border-neutral-300 dark:border-neutral-700' />
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
