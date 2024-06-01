interface ImageProperties {
	className?: string;
	src: string;
	alt?: string;
	objectFit?: 'contain' | 'fill';
}

export default function Image({ className, src, alt, objectFit }: ImageProperties): React.ReactElement {
	const objectFitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

	return <img alt={alt} className={`max-w-full h-auto ${objectFitClass} ${className ?? ''}`} src={src} />;
}
