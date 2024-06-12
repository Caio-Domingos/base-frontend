import KpiCardComponent from '@components/simple/KpiCard/KpiCard.component';

export default function HomeScreen(): React.ReactElement {
	return (
		<div className='box-border w-full px-4 flex justify-start gap-3 flex-wrap'>
			<KpiCardComponent
				more={[
					{ title: 'More 1', icon: 'fa-solid fa-ellipsis-vertical', action: () => console.log('More 1') },
					{ title: 'More 2', icon: 'fa-solid fa-ellipsis-vertical', action: () => console.log('More 2') },
				]}
				title='Title 1'
				value='90.1M'
			/>
			<KpiCardComponent
				more={[
					{ title: 'More 1', icon: 'fa-solid fa-ellipsis-vertical', action: () => console.log('More 1') },
					{ title: 'More 2', icon: 'fa-solid fa-ellipsis-vertical', action: () => console.log('More 2') },
				]}
				title='Title 2'
				value='82.3K'
			/>
			<KpiCardComponent />
			<KpiCardComponent />
			{/* <KpiCardComponent size="medium" />
			<KpiCardComponent size="large" /> */}
		</div>
	);
}
