import {Subcategory} from '../../interfaces/Subcategory.interface';

export interface ShopState {
	car: Subcategory[];
}
type ShopAction =
	| {type: 'set_item'; payload: any}
	| {type: 'unset_item'; payload: any}
	| {type: 'empty_car'};

export const shopReducer = (
	state: ShopState,
	action: ShopAction
): ShopState => {
	switch (action.type) {
		case 'set_item':
			return {
				...state,
				car: [...state.car, action.payload]
			};

		case 'unset_item':
			return {
				...state,
				car: [...state.car.filter((item) => item.id !== action.payload.id)]
			};
		case 'empty_car':
			return {
				...state,
				car: []
			};

		default:
			return state;
	}
};
