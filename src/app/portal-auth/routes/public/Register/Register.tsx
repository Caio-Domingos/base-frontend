import CustomImage from '@components/base/Image';
import Button from '@components/form-control/Button';
import SocialButtonsGroup from '@components/form-control/SocialButtonsGroup';
import TextField from '@components/form-control/TextField';
import { useMemo, useState } from 'react';

export default function RegisterScreen(): React.ReactElement {
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
					<TextField className='mt-2' label='Email' type='email' />
					<TextField className='mt-2' label='Nome' />
					<TextField className='mt-2' label='Senha' />

					<Button>Criar</Button>
					<hr className='mt-xl mb-base mx-sm border-neutral-300 dark:border-neutral-700' />
					<div className='block text-center mt-base'>
						<p className='text-medium font-semibold'>Ou entre com suas redes sociais</p>
					</div>
					<SocialButtonsGroup buttons={socialButton} />
					<div className='block text-left mt-base'>
						<p className='text-sm font-light'>
							Não tem uma conta?
							<a className='font-semibold text-primary dark:text-primary hover:text-primary-600 focus:text-primary-600' href='/register'>
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
