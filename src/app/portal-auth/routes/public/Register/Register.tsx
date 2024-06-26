/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-handler-names */
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import CustomImage from '@components/base/Image';
import Button from '@components/form-control/Button';
import SocialButtonsGroup from '@components/form-control/SocialButtonsGroup';
import TextField from '@components/form-control/TextField';
import RegisterHandler from './Register.handler';
import { addNotification } from '@store/slicers/notification.slicer';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RegisterScreen(): React.ReactElement {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		window.HSStaticMethods.autoInit();
	}, [location.pathname]);

	const dispatch = useDispatch();

	const socialButton: any = useMemo(
		() => ({
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
		}),
		[]
	);
	const handler = useMemo(() => new RegisterHandler(), []);

	const form = useFormik({
		initialValues: {
			email: '',
			name: '',
			password: '',
		},
		onSubmit: async (values) => {
			console.log(values);
			try {
				const response = await handler.register(values.name, values.email, values.password);
				console.log('onSubmit response', response);
				dispatch(addNotification({ message: 'Conta criada com sucesso', type: 'success', duration: 5000 }));
				navigate('/login');
			} catch (error: any) {
				console.error(error);
				dispatch(addNotification({ message: error.msg ?? 'Erro ao criar conta', type: 'error', duration: 3000 }));
			}
		},
		onReset: () => {
			form.resetForm();
		},
		validationSchema: yup.object().shape({
			email: yup.string().email('Email inválido').required('Email é obrigatório'),
			name: yup.string().required('Nome é obrigatório'),
			password: yup.string().required('Senha é obrigatória'),
		}),
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
					<h1 className='text-xl font-bold mt-12'>Criar nova conta</h1>
					<TextField className='mt-2' label='Email' type='email' value={form.values.email} onChange={form.handleChange} />
					<TextField className='mt-2' label='Nome' name='name' value={form.values.name} onChange={form.handleChange} />
					<TextField className='mt-2' label='Senha' password name='password' value={form.values.password} onChange={form.handleChange} />

					<Button onClick={form.handleSubmit} disabled={!form.isValid || !form.dirty}>
						Criar
					</Button>
					<hr className='mt-xl mb-base mx-sm border-neutral-300 dark:border-neutral-700' />
					<div className='block text-center mt-base'>
						<p className='text-medium font-semibold'>Ou entre com suas redes sociais</p>
					</div>
					<SocialButtonsGroup buttons={socialButton} />
					<div className='block text-left mt-base'>
						<p className='text-sm font-light'>
							Já tem uma conta?
							<a className='font-semibold text-primary dark:text-primary hover:text-primary-600 focus:text-primary-600' href='/'>
								{' '}
								Entrar agora{' '}
							</a>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
