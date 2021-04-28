import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {ShopContext} from '../context/shop/ShopContext';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {SingleSubcategory} from './SingleSubcategory';

interface Props {
	subcategories: Subcategory[];
}

export const SubcategoriesList = ({subcategories}: Props) => {
	const {car, setItem} = useContext(ShopContext);
	return (
		<View
			style={{
				alignItems: 'flex-start',
				marginTop: 50,
				marginLeft: 10,
				marginBottom: 50
			}}
		>
			<View style={{flexDirection: 'row', marginBottom: 5}}>
				<View style={{flex: 3}}>
					<Text style={{textAlign: 'left'}}>Elemento</Text>
				</View>
				<View style={{flex: 1}}>
					<Text style={{textAlign: 'center'}}>Cantidad</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{textAlign: 'center'}}>Añadir al carrito</Text>
				</View>
			</View>

			{subcategories.map((item, index) => (
				<SingleSubcategory
					key={index.toString()}
					item={item}
					setItem={setItem}
					car={car}
				/>
			))}
		</View>
	);
};
const Item = () => {};
