import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ShopContext} from '../context/shop/ShopContext';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {HeaderTable} from './HeaderTable';
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
				marginBottom: 70
			}}
		>
			{/* <View style={{flexDirection: 'row', marginBottom: 5}}>
				<View style={{flex: 4}}>
					<Text style={{textAlign: 'left'}}>Elemento</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{textAlign: 'center', marginLeft: 10}}>Precio</Text>
				</View>
				<View style={{flex: 2, marginLeft: 5}}>
					<Text style={{textAlign: 'center'}}>Cantidad</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{textAlign: 'center'}}>Añadir</Text>
				</View>
			</View> */}
			<HeaderTable editHeader={'Añadir'} />
			{subcategories.map((item, index) => (
				<SingleSubcategory key={index.toString()} item={item} root={'Subca'} />
			))}
		</View>
	);
};
