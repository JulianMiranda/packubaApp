import React, {useEffect, useState} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {CarItemProps} from '../interfaces/Shop.Interface';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {MovingImage} from './MovingImage';
interface Props {
	car: CarItemProps[];
	item: Subcategory;
	setItem: (item: any) => void;
}
export const SingleSubcategory = ({car, item, setItem}: Props) => {
	const [cantidad, setCantidad] = useState('1');
	const [buttonName, setButtonName] = useState('Add');

	useEffect(() => {
		car.map(({subcategory, cantidad}) => {
			if (subcategory.id === item.id) {
				setCantidad(cantidad.toString());
				setButtonName('Edit');
			}
		});
	}, [car]);
	useEffect(() => {
		if (parseInt(cantidad) < 1) setCantidad('1');
	}, [cantidad]);
	const setCarItem = () => {
		if (parseInt(cantidad) < 1) {
			setCantidad('1');
			console.log('Sacar aviso mayor q cero');
		} else {
			setItem({subcategory: item, cantidad: parseInt(cantidad)});
		}
	};
	return (
		<View style={styles.itemContainer}>
			<MovingImage uri={item.image.url} style={styles.image} />
			{/* <Image source={{uri: item.image.url}} style={styles.image} /> */}
			<View style={{flex: 6}}>
				<Text style={styles.name}>{item.name}</Text>
			</View>
			<View style={{flex: 2}}>
				<Text style={styles.name}>{item.price}$</Text>
			</View>
			<View style={{flex: 3, flexDirection: 'row'}}>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center'
					}}
					onPress={() =>
						cantidad !== '1' && setCantidad((parseInt(cantidad) - 1).toString())
					}
				>
					<Text style={{fontSize: 22, color: 'red'}}>
						{cantidad !== '1' ? '-' : ' '}
					</Text>
				</TouchableOpacity>
				<TextInput
					style={{
						color: buttonName === 'Añadir' ? '#CACACA' : 'black',
						flex: 1,
						paddingHorizontal: 5,
						textAlign: 'center'
					}}
					keyboardType="number-pad"
					value={cantidad}
					onChangeText={(value) => setCantidad(value)}
				/>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center'
					}}
					onPress={() => setCantidad((parseInt(cantidad) + 1).toString())}
				>
					<Text style={{fontSize: 22, color: 'green'}}>+</Text>
				</TouchableOpacity>
			</View>
			<View style={{flex: 3}}>
				<TouchableOpacity
					style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
					onPress={setCarItem}
				>
					<Icon
						style={{
							textAlign: 'center',
							color: buttonName === 'Add' ? '#22ad29' : '#E7E35E'
						}}
						name={buttonName === 'Add' ? 'shopping-basket' : 'pencil-alt'}
						size={18}
					/>
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
