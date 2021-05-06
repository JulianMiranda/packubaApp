import React, {useContext, useEffect, useState} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ShopContext} from '../context/shop/ShopContext';
import {CarItemProps} from '../interfaces/Shop.Interface';
import {Subcategory} from '../interfaces/Subcategory.interface';
import {FadeInImage} from './FadeInImage';
import {ModalComponent} from './Modal';

type Root = 'Shop' | 'Subca';

interface Props {
	item: Subcategory;
	root: Root;
}
export const SingleSubcategory = ({item, root}: Props) => {
	const {car, setItem, unsetItem} = useContext(ShopContext);
	const [cantidad, setCantidad] = useState('1');
	const [buttonName, setButtonName] = useState('Add');
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		car.map(({subcategory, cantidad}) => {
			if (subcategory.id === item.id) {
				setCantidad(cantidad.toString());
				setButtonName('Edit');
			} else {
				setButtonName('Add');
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
			<TouchableOpacity activeOpacity={0.8} onPress={() => setIsVisible(true)}>
				<FadeInImage uri={item.image.url} style={styles.image} />
			</TouchableOpacity>
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
					onPress={() => {
						if (root === 'Shop')
							setItem({subcategory: item, cantidad: parseInt(cantidad) - 1});
						cantidad !== '1' &&
							setCantidad((parseInt(cantidad) - 1).toString());
					}}
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
					onChangeText={(value) => {
						if (root === 'Shop')
							setItem({subcategory: item, cantidad: parseInt(value)});
						setCantidad(value);
					}}
				/>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center'
					}}
					onPress={() => {
						if (root === 'Shop')
							setItem({subcategory: item, cantidad: parseInt(cantidad) + 1});
						setCantidad((parseInt(cantidad) + 1).toString());
					}}
				>
					<Text style={{fontSize: 22, color: 'green'}}>+</Text>
				</TouchableOpacity>
			</View>
			<View style={{flex: 3}}>
				{root === 'Shop' ? (
					<TouchableOpacity
						style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
						onPress={() => unsetItem(item)}
					>
						<Text style={{color: 'red'}}>Quitar</Text>
					</TouchableOpacity>
				) : (
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
				)}
			</View>
			<ModalComponent
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				imageUri={item.image.url}
			/>
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
