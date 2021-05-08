import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../screens/Settings/SettingsScreen';
import {ChangeThemeScreen} from '../screens/Settings/ChangeThemeScreen';
import {OrdersScreen} from '../screens/Settings/OrdersScreen';
import {ThemeContext} from '../context/theme/ThemeContext';
import {Order} from '../interfaces/Order.interface';
import {SingleOrderScreen} from '../screens/Settings/SingleOrderScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
	SettingsScreen: undefined;
	ChangeThemeScreen: undefined;
	OrdersScreen: undefined;
	SingleOrderScreen: {order: Order};
};

export const SettingsStack = () => {
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.card
				},
				headerTintColor: '#fff'
			}}
		>
			<Stack.Screen
				name="SettingsScreen"
				component={SettingsScreen}
				options={{
					title: 'Configuración',
					headerBackTitleVisible: false
				}}
			/>
			<Stack.Screen
				name="ChangeThemeScreen"
				component={ChangeThemeScreen}
				options={{
					title: 'ChangeTheme',
					headerBackTitleVisible: false
				}}
			/>
			<Stack.Screen
				name="OrdersScreen"
				component={OrdersScreen}
				options={{
					title: 'Historial',
					headerBackTitleVisible: false
				}}
			/>
			<Stack.Screen
				name="SingleOrderScreen"
				component={SingleOrderScreen}
				options={{
					title: 'Orden',
					headerBackTitleVisible: false
				}}
			/>
		</Stack.Navigator>
	);
};
