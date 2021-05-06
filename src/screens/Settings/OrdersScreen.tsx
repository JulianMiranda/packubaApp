import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useOrders} from '../../hooks/useOrders';
import {Order} from '../../interfaces/Order.interface';
import moment from 'moment';

export const OrdersScreen = () => {
	const {orders} = useOrders();
	console.log(orders.length);

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
	const order: Order = singleOrder;
	return (
		<View style={styles.card}>
			<Text style={styles.firstText}>
				Hecho {moment(order.createdAt).fromNow()}
			</Text>
			<Text style={styles.firstText}>Costo total {order.cost}$</Text>
			<Text style={styles.firstText}>Productos Comprados:</Text>
			{order.car.map((item, index) => (
				<View key={index.toString()} style={styles.subcategory}>
					<Text>- {item.cantidad}</Text>
					<Text> {item.subcategory.name}</Text>
				</View>
			))}
		</View>
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
