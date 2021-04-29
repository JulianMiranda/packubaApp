import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {RootStackParams} from '../../navigation/HomeStack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ShopContext} from '../../context/shop/ShopContext';
import {CarItemProps} from '../../interfaces/Shop.Interface';
import {registerForPushNotifications} from '../../utils/notificationPermissions';

interface Props extends StackScreenProps<RootStackParams, 'ShopScreen'> {}

interface FunctionProps {
	item: CarItemProps;
	unsetItem: (item: any) => void;
}

export const ShopScreen = (props: Props) => {
	const {navigation, route} = props;
	const {color} = route.params;
	const {top} = useSafeAreaInsets();

	const {car, unsetItem, emptyCar, makeShop} = useContext(ShopContext);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		let total = 0;
		car.forEach(function (item) {
			const valor = item.cantidad * item.subcategory.price;
			total += valor;
		});
		setTotal(total);
	}, [car]);

	return (
		<>
			{/* Backbutton */}
			<BackButton {...props} />
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
						Mis Compras
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
					Cosas carrito
				</Text>
				{car.map((item, index) => (
					<Item key={index.toString()} item={item} unsetItem={unsetItem} />
				))}
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
				<TouchableOpacity onPress={() => makeShop(total)}>
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
			<View style={{flex: 3}}>
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
		borderBottomRightRadius: 1000,
		borderBottomLeftRadius: 0
	},
	backButton: {
		position: 'absolute',
		zIndex: 999999999,
		left: 20
	},
	titleList: {
		color: 'white',
		fontSize: 40,
		alignSelf: 'flex-start',
		left: 20
	},
	pokeball: {
		width: 250,
		height: 250,
		bottom: -20,
		opacity: 0.7
	},
	pokemonImage: {
		borderRadius: 90,
		width: 250,
		height: 250,
		position: 'absolute',
		bottom: -15
	},
	loadingIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	},
	image: {
		height: 40,
		width: 40,
		borderRadius: 100
	}
});
