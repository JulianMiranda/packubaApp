import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native';
import {useOrders} from '../../hooks/useOrders';
import {Order} from '../../interfaces/Order.interface';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

export const OrdersScreen = () => {
	const {orders} = useOrders();
	return (
		<ScrollView style={{padding: 20}}>
			<Text style={styles.title}>Historial de Compras</Text>
			{orders.map((item, index) => (
				<OrderComponent singleOrder={item} key={index.toString()} />
			))}
		</ScrollView>
	);
};

const OrderComponent = ({singleOrder}: any) => {
	const navigation = useNavigation();
	const order: Order = singleOrder;
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => navigation.navigate('SingleOrderScreen', {order})}
			style={styles.card}
		>
			<Text style={styles.firstText}>
				Compra realizada {moment(order.createdAt).calendar()}
			</Text>
			<Text style={styles.firstText}>Costo total {order.cost}$</Text>
			<Text style={{...styles.firstText, marginTop: 7, color: '#2684FD'}}>
				Ver Detalles
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24
	},
	card: {
		margin: 5,
		backgroundColor: '#f8f7f7',
		borderRadius: 3,
		padding: 5
	},
	subcategory: {
		marginHorizontal: 5,
		flexDirection: 'row'
	},
	firstText: {
		fontSize: 16
	}
});
