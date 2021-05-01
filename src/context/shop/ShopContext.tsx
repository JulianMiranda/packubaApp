import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {ShopState, shopReducer} from './shopReducer';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {CarItemProps, MyShopResponse} from '../../interfaces/Shop.Interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';

type ShopContextProps = {
	car: CarItemProps[];
	setItem: (item: CarItemProps) => void;
	unsetItem: (item: Subcategory) => void;
	emptyCar: () => void;
	makeShop: (total: number) => void;
};
const shopInicialState: ShopState = {
	car: []
};

export const ShopContext = createContext({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {
	const {status, user} = useContext(AuthContext);
	const [state, dispatch] = useReducer(shopReducer, shopInicialState);

	useEffect(() => {
		if (status === 'authenticated') checkCar();
	}, [status]);
	const checkCar = async () => {
		const resp = await api.get<Array<MyShopResponse>>('/shop/getMyShop');
		if (resp.data[0].car.length > 0) {
			resp.data[0].car.map((item) => setItem(item));
		}
	};
	const setItem = (item: CarItemProps) => {
		const subcategoriesCar = state.car.map((item) => item.subcategory.id);
		if (subcategoriesCar.includes(item.subcategory.id)) {
			console.log('actualizar Producto');
			const newState = state.car.filter(
				(carItem) => carItem.subcategory.id !== item.subcategory.id
			);
			api.post('/shop/setMyShop', {user: user!.id, car: [...newState, item]});
			dispatch({type: 'update_item', payload: item});
		} else {
			console.log('producto Nuevo');
			api.post('/shop/setMyShop', {user: user!.id, car: [...state.car, item]});
			dispatch({type: 'set_item', payload: item});
		}
	};

	const unsetItem = (item: Subcategory) => {
		const newState = state.car.filter(
			(carItem) => carItem.subcategory.id !== item.id
		);
		console.log('Quito', [...newState, item]);

		api.post('/shop/setMyShop', {user: user!.id, car: [...newState]});
		dispatch({type: 'unset_item', payload: item});
	};

	const emptyCar = () => {
		api.post('/shop/setMyShop', {user: user!.id, car: []});
		dispatch({type: 'empty_car'});
	};

	const makeShop = async (total: number) => {
		const a = await api.post('/orders/setOrder', {
			user: user!.id,
			cost: total,
			car: state.car
		});
		if (a.status === 201) dispatch({type: 'empty_car'});
	};

	return (
		<ShopContext.Provider
			value={{
				...state,
				setItem,
				unsetItem,
				emptyCar,
				makeShop
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};
