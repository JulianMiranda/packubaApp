import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity, View, Text} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {RootStackParams} from '../../navigation/SettingsStack';
import moment from 'moment';

interface Props
	extends StackScreenProps<RootStackParams, 'SingleOrderScreen'> {}

export const SingleOrderScreen = (props: Props) => {
	const {navigation, route} = props;
	const {order} = route.params;

	return (
		<View
			style={{
				flex: 1,
				margin: 10
			}}
		>
			<Text style={{fontSize: 22, fontWeight: '300'}}>
				Hecho {moment(order.createdAt).fromNow()}
			</Text>
			<Text style={{fontSize: 22, fontWeight: '300'}}>
				Costo total {order.cost}$
			</Text>
			<Text style={{fontSize: 22, fontWeight: '300'}}>
				Productos Comprados:
			</Text>
			{order.car.map((item, index) => (
				<View
					key={index.toString()}
					style={{marginHorizontal: 5, flexDirection: 'row'}}
				>
					<Text>- {item.cantidad}</Text>
					<Text> {item.subcategory.name}</Text>
				</View>
			))}
		</View>
	);
};
