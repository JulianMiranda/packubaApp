import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {ShopContext} from '../context/shop/ShopContext';

interface Props extends StackScreenProps<any, any> {}
export const ShopIcon = ({navigation}: Props) => {
	const {car} = useContext(ShopContext);
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() =>
				navigation.navigate('ShopScreen', {
					color: '#F15911'
				})
			}
			style={styles.shopIcon}
		>
			{car.length > 0 && car.length < 10 && (
				<View style={styles.badge}>
					<Text>{car.length}</Text>
				</View>
			)}
			{car.length > 9 && (
				<View style={styles.badge}>
					<Text>+9</Text>
				</View>
			)}
			<Icon color="#0f0d0d" name="cart-outline" size={40} />
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	shopIcon: {
		position: 'absolute',
		right: 25,
		top: 45,
		zIndex: 9999999999
	},
	badge: {
		backgroundColor: 'red',
		zIndex: 99999999999,
		alignItems: 'center',
		justifyContent: 'center',
		height: 20,
		width: 20,
		position: 'absolute',
		borderRadius: 100,
		right: 0
	}
});
