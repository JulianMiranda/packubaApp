import React, {createContext, useEffect, useReducer} from 'react';

import {ShopState, shopReducer} from './shopReducer';

type ShopContextProps = {
	car: string[];
	setItem: (item: any) => void;
	unsetItem: (item: any) => void;
	emptyCar: () => void;
};
const shopInicialState: ShopState = {
	car: []
};

export const ShopContext = createContext({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {
	const [state, dispatch] = useReducer(shopReducer, shopInicialState);

	const setItem = (item: any) => {
		dispatch({type: 'set_item', payload: item});
	};

	const unsetItem = (item: any) => {
		dispatch({type: 'unset_item', payload: item});
	};

	const emptyCar = () => {
		dispatch({type: 'empty_car'});
	};

	return (
		<ShopContext.Provider
			value={{
				...state,
				setItem,
				unsetItem,
				emptyCar
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};
