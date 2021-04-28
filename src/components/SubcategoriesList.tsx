import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ShopContext} from '../context/shop/ShopContext';
import {Subcategory} from '../interfaces/Subcategory.interface';

interface Props {
	subcategories: Subcategory[];
}
interface FunctionProps {
	item: Subcategory;
	setItem: (item: any) => void;
}

export const SubcategoriesList = ({subcategories}: Props) => {
	const {setItem} = useContext(ShopContext);
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
					<Text>Elemento</Text>
				</View>
				<View style={{flex: 2}}>
					<Text>Cantidad</Text>
				</View>
				<View style={{flex: 1}}>
					<Text>Añadir</Text>
				</View>
			</View>

			{subcategories.map((item, index) => (
				<Item key={index.toString()} item={item} setItem={setItem} />
			))}
		</View>
	);
};
const Item = ({item, setItem}: FunctionProps) => {
	return (
		<View style={styles.itemContainer}>
			<Image source={{uri: item.image.url}} style={styles.image} />
			<View style={{flex: 3}}>
				<Text style={styles.name}>{item.name}</Text>
			</View>
			<View style={{flex: 2}}>
				<Text style={styles.name}>1</Text>
			</View>
			<View style={{flex: 1}}>
				<TouchableOpacity onPress={() => setItem(item)}>
					<Text style={{}}>Añadir</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 3
	},
	name: {
		fontSize: 20,
		fontWeight: '400',
		marginVertical: 3
	},
	image: {
		height: 40,
		width: 40,
		borderRadius: 100
	}
});
