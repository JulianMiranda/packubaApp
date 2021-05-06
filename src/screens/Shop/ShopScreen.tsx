import React, {useContext, useEffect, useState} from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Platform,
	Alert,
	Linking
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderTable} from '../../components/HeaderTable';
import {SingleSubcategory} from '../../components/SingleSubcategory';
import {ShopContext} from '../../context/shop/ShopContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {CarItemProps} from '../../interfaces/Shop.Interface';

interface FunctionProps {
	item: CarItemProps;
	unsetItem: (item: any) => void;
}

export const ShopScreen = () => {
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	const color = colors.primary;
	const {top} = useSafeAreaInsets();

	const {car, message, unsetItem, emptyCar, makeShop, removeAlert} = useContext(
		ShopContext
	);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		let total = 0;
		car.forEach(function (item) {
			const valor = item.cantidad * item.subcategory.price;
			total += valor;
		});
		setTotal(total);
	}, [car]);

	const makeShopFunction = () => {
		makeShop(total);
	};
	useEffect(() => {
		if (message.length === 0) return;

		Alert.alert('Paso obligatorio', message, [
			{
				text: 'Cancel',
				onPress: removeAlert,
				style: 'destructive'
			},
			{
				text: 'Ok',
				onPress: () => {
					removeAlert();
					Linking.openURL(
						'http://api.whatsapp.com/send?text=Este es un mensaje predetermidado&phone=+593995687985'
					);
				}
			}
		]);
	}, [message]);

	return (
		<>
			<ScrollView style={{flex: 1}}>
				{/* Heade Containerr */}
				<View
					style={{
						...styles.headerContainer,
						backgroundColor: color
					}}
				>
					<Text
						style={{
							...styles.titleList,
							top: top + 50
						}}
					>
						Mi Compra
					</Text>
				</View>

				{/* Detalles y Loading */}
				<Text
					style={{
						marginTop: 30,
						marginLeft: 10,
						fontSize: 26,
						fontWeight: '600'
					}}
				>
					Productos
				</Text>
				<View style={{marginLeft: 7}}>
					<View>
						<HeaderTable editHeader={'Quitar'} />
					</View>
					{car.map((item, index) => (
						<SingleSubcategory
							key={index.toString()}
							item={item.subcategory}
							root={'Shop'}
						/>
					))}
					{/* {car.map((item, index) => (
					<Item key={index.toString()} item={item} unsetItem={unsetItem} />
				))} */}
					{car.length < 1 && (
						<Text
							style={{
								marginTop: 30,
								marginLeft: 10,
								fontSize: 22,
								fontWeight: '400'
							}}
						>
							Carrito vacío 😦
						</Text>
					)}
					<Text
						style={{
							marginTop: 30,
							marginLeft: 10,
							fontSize: 26,
							fontWeight: '600'
						}}
					>
						Total: {total}$
					</Text>
				</View>
			</ScrollView>
			<View
				style={{
					position: 'absolute',
					bottom: 75,
					zIndex: 99999,
					left: 50,
					alignContent: 'space-between',
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: '#D5D5D5',
					padding: 10,
					borderRadius: 60
				}}
			>
				<TouchableOpacity onPress={() => emptyCar()}>
					<Text style={{color: 'red'}}>Vaciar Carrito</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					position: 'absolute',
					zIndex: 99999,
					bottom: 75,
					right: 50,
					alignContent: 'space-between',
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: '#FB8046',
					padding: 10,
					borderRadius: 60
				}}
			>
				<TouchableOpacity
					activeOpacity={car.length < 1 ? 1 : 0.8}
					onPress={car.length < 1 ? () => {} : makeShopFunction}
				>
					<Text style={{color: 'white'}}>Realizar Compra</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const Item = ({item, unsetItem}: FunctionProps) => {
	return (
		<View style={styles.itemContainer}>
			<View style={{flex: 2}}>
				<Text style={styles.name}>{item.cantidad}</Text>
			</View>
			<View style={{flex: 6}}>
				<Text style={{...styles.name}}>{item.subcategory.name}</Text>
			</View>

			<View style={{flex: 8}}>
				<Text style={styles.name}>
					{item.subcategory.price * item.cantidad} $
				</Text>
			</View>
			<View style={{flex: 2}}>
				<TouchableOpacity onPress={() => unsetItem(item.subcategory)}>
					<Text style={{color: 'red'}}>Quitar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		height: 170,
		zIndex: 999,
		alignItems: 'center',
		borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
		borderBottomLeftRadius: 0
	},

	titleList: {
		color: 'white',
		fontSize: 40,
		alignSelf: 'flex-start',
		left: 20
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 3,
		marginHorizontal: 10
	},
	name: {
		fontSize: 16,
		fontWeight: '300',
		marginVertical: 3
	}
});
