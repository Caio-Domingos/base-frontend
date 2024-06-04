/* eslint-disable react/jsx-handler-names */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable unicorn/no-nested-ternary */
import { useMemo, useState } from 'react';
import slugify from 'slugify';

/* eslint-disable unicorn/no-keyword-prefix */
interface TextFieldProperties {
	label: string;
	placeholder?: string;
	id?: string;
	name?: string;
	type?: string;
	className?: string;

	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

	prefix?: {
		icon: string;
	};
	suffix?: {
		icon: string;
		clickabble?: boolean;
		onClick?: () => void;
		// TODO: Do this works
	};

	password?: boolean;
}

export default function TextField({
	label,
	prefix,
	suffix,
	placeholder,
	id,
	name,
	type,
	password,
	className,
	onChange,
	value,
}: TextFieldProperties): React.ReactElement {
	const defaultValue = useMemo(() => (type === 'text' ? '' : type === 'number' ? 0 : ''), [type]);
	const defaultId = useMemo(() => id ?? slugify(label, { lower: true }), [id, label]);
	const defaultName = useMemo(() => name ?? slugify(label, { lower: true }), [name, label]);

	const [passwordInputType, setPasswordInputType] = useState<string>('password');

	const changePasswordInputType = (): void => {
		setPasswordInputType(passwordInputType === 'password' ? 'text' : 'password');
	};

	return (
		<div className={className ?? ''}>
			<label className='block text-gray-900 dark:text-white'>{label}</label>
			<div className='relative w-full box-border'>
				{!!prefix && <i className='absolute right-4 bottom-[1.1rem] fa-solid fa-house' />}
				{!!suffix && <i className='absolute left-4 bottom-[1.1rem] fa-solid fa-house' />}
				{!!password && (
					<>
						<i
							className={`absolute right-4 bottom-[1.1rem] cursor-pointer fa-solid fa-eye ${passwordInputType === 'password' ? '' : 'hidden'}`}
							onClick={() => changePasswordInputType()}
						/>
						<i
							className={`absolute right-4 bottom-[1.1rem] cursor-pointer fa-solid fa-eye-slash ${passwordInputType === 'password' ? 'hidden' : ''}`}
							onClick={() => changePasswordInputType()}
						/>
					</>
				)}
				<input
					type={password ? passwordInputType : type ?? 'text'}
					name={defaultName}
					id={defaultId}
					placeholder={placeholder ?? ''}
					className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 ${!!prefix && 'pl-11'} ${
						!!suffix && 'pr-11'
					} border border-neutral-300 focus:border-blue-500 focus:bg-white focus:outline-none`}
					value={value ?? defaultValue}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}
