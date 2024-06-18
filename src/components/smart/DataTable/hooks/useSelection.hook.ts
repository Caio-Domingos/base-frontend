/* eslint-disable unicorn/no-object-as-default-parameter */
import { useState } from 'react';

interface Selection {
	type: 'all' | 'none' | 'some-all' | 'some-none';
	selected?: any[];
	unselected?: any[];
}

interface UseSelectionState {
	selection: Selection;
	onChangeItemSelection: (item: any, value: boolean) => void;
	onChangeBulkSelection: (value: boolean) => void;
	setSelection: React.Dispatch<React.SetStateAction<Selection>>;
}

export default function useSelection(initialSelection: Selection = { type: 'none' }): UseSelectionState {
	const [selection, setSelection] = useState<Selection>(initialSelection);

	const onChangeItemSelection = (item: any, value: boolean): void => {
		let newSelection: Selection;

		switch (selection.type) {
			case 'all': {
				newSelection = {
					...selection,
					type: 'some-all',
					unselected: value ? selection.unselected?.filter((i) => i !== item) : [...(selection.unselected ?? []), item],
					selected: [],
				};
				break;
			}
			case 'none': {
				newSelection = {
					...selection,
					type: 'some-none',
					selected: value ? [...(selection.selected ?? []), item] : selection.selected?.filter((i) => i !== item),
					unselected: [],
				};
				break;
			}
			case 'some-all': {
				newSelection = {
					...selection,
					unselected: value ? selection.unselected?.filter((i) => i !== item) : [...(selection.unselected ?? []), item],
				};
				break;
			}
			case 'some-none': {
				newSelection = {
					...selection,
					selected: value ? [...(selection.selected ?? []), item] : selection.selected?.filter((i) => i !== item),
				};
				break;
			}
			default: {
				newSelection = selection;
				break;
			}
		}

		setSelection(newSelection);
	};

	const onChangeBulkSelection = (value: boolean): void => {
		const newSelection: Selection = value ? { type: 'all' } : { type: 'none' };
		setSelection(newSelection);
	};

	return {
		selection,
		onChangeItemSelection,
		onChangeBulkSelection,
		setSelection,
	};
}
