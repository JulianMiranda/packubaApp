import {CarItemProps} from '../../interfaces/Shop.Interface';
import {Subcategory} from '../../interfaces/Subcategory.interface';

export interface ShopState {
	car: CarItemProps[];
	message: string;
}
type ShopAction =
	| {type: 'set_item'; payload: CarItemProps}
	| {type: 'unset_item'; payload: Subcategory}
	| {type: 'update_item'; payload: CarItemProps}
	| {type: 'show_alert'; payload: string}
	| {type: 'remove_alert'}
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
				car: [
					...state.car.filter(
						(item) => item.subcategory.id !== action.payload.id
					)
				]
			};
		case 'update_item':
			return {
				...state,
				car: [
					...state.car.map((item) => {
						if (item.subcategory.id === action.payload.subcategory.id) {
							return {
								cantidad: (item.cantidad = action.payload.cantidad),
								subcategory: action.payload.subcategory
							};
						} else {
							return item;
						}
					})
				]
			};
		case 'empty_car':
			return {
				...state,
				car: []
			};
		case 'show_alert':
			return {
				...state,
				message: action.payload
			};
		case 'remove_alert':
			return {
				...state,
				message: ''
			};

		default:
			return state;
	}
};
