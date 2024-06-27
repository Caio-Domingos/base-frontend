import Button from './Button';

export interface SocialButtonProperties {
	text?: string;
	icon: boolean;
	onClick?: () => void;
	disabled?: boolean;

	color?: 'dark' | 'light' | 'primary' | 'secondary' | 'tertiary';
}
export interface SocialButtonsGroupProperties {
	buttons?: {
		facebook?: SocialButtonProperties;
		google?: SocialButtonProperties;
		apple?: SocialButtonProperties;
	};
}

export default function SocialButtonsGroup({ buttons }: SocialButtonsGroupProperties): React.ReactElement {
	return (
		<div className='flex items-center justify-center gap-3 w-full'>
			{buttons?.google ? (
				<Button className='flex-auto font-medium rounded' color={buttons.google.color} onClick={buttons.google.onClick}>
					{' '}
					{buttons.google.icon ? <i className='fa-brands text-2xl fa-google' /> : undefined} {buttons.google.text ?? ''}
				</Button>
			) : undefined}
			{buttons?.facebook ? (
				<Button className='flex-auto font-medium rounded' color={buttons.facebook.color} onClick={buttons.facebook.onClick}>
					{' '}
					{buttons.facebook.icon ? <i className='fa-brands text-2xl fa-facebook' /> : undefined} {buttons.facebook.text ?? ''}
				</Button>
			) : undefined}
			{buttons?.apple ? (
				<Button className='flex-auto font-medium rounded' color={buttons.apple?.color} onClick={buttons.apple.onClick}>
					{' '}
					{buttons.apple?.icon ? <i className='fa-brands text-2xl fa-apple' /> : undefined} {buttons.apple?.text ?? ''}
				</Button>
			) : undefined}
		</div>
	);
}
