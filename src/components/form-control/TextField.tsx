/* eslint-disable unicorn/no-keyword-prefix */
interface TextFieldProperties {
	label: string;
	placeholder?: string;
	id?: string;
	name?: string;
	type?: string;

	className?: string;
}

export default function TextField({ label, placeholder, id, name, type, className }: TextFieldProperties): React.ReactElement {
	return (
		<div className={className ?? ''}>
			<label className='block text-gray-900 dark:text-white'>{label}</label>
			<input
				type={type ?? 'text'}
				name={name ?? ''}
				id={id ?? ''}
				placeholder={placeholder ?? ''}
				className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
			/>
		</div>
	);
}
