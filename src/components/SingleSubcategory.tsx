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

interface Props {
	car: CarItemProps[];
	item: Subcategory;
	setItem: (item: any) => void;
}
export const SingleSubcategory = ({car, item, setItem}: Props) => {
	const [cantidad, setCantidad] = useState('1');
	const [buttonName, setButtonName] = useState('Add');
	console.log(item.currency);

	useEffect(() => {
		car.map(({subcategory, cantidad}) => {
			if (subcategory.id === item.id) {
				setCantidad(cantidad.toString());
				setButtonName('Edit');
			}
		});
	}, [car]);
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
			<Image source={{uri: item.image.url}} style={styles.image} />
			<View style={{flex: 6}}>
				<Text style={styles.name}>{item.name}</Text>
			</View>
			<View style={{flex: 2}}>
				<Text style={styles.name}>{item.price}$</Text>
			</View>
			<View style={{flex: 2}}>
				<TextInput
					style={{
						color: buttonName === 'Añadir' ? '#CACACA' : 'black',
						flex: 1,
						paddingLeft: 5
					}}
					keyboardType="number-pad"
					value={cantidad}
					onChangeText={(value) => setCantidad(value)}
				/>
			</View>
			<View style={{flex: 3}}>
				<TouchableOpacity onPress={setCarItem}>
					<Icon
						style={{
							textAlign: 'center',
							color: buttonName === 'Add' ? '#22ad29' : '#E7E35E'
						}}
						name={buttonName === 'Add' ? 'plus' : 'pencil-alt'}
						size={18}
					/>
					{/* <Text
						style={{
							textAlign: 'center',
							color: buttonName === 'Añadir' ? '#22ad29' : '#E7E35E'
						}}
					>
						{buttonName}
					</Text> */}
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
