import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SettingsStack} from './SettingsStack';
import {HomeStack} from './HomeStack';
import {ThemeContext} from '../context/theme/ThemeContext';
import {Platform} from 'react-native';
import {ShopStack} from './ShopStack';

const Tab = createBottomTabNavigator();

export const TabsNavigation = () => {
	const {
		theme: {colors},
		theme
	} = useContext(ThemeContext);
	return (
		<Tab.Navigator
			initialRouteName="home"
			tabBarOptions={{
				/* style: {
					position: 'absolute',
					elevation: 0
				}, */
				keyboardHidesTabBar: true,
				inactiveTintColor: 'gray',
				activeTintColor: colors.primary,
				labelStyle: {
					marginBottom: Platform.OS === 'ios' ? 5 : 10
				},
				style: {
					position: 'absolute',
					backgroundColor: theme.tabColor,
					borderWidth: 0,
					elevation: 0,
					height: Platform.OS === 'ios' ? 50 : 60
				}
			}}
			screenOptions={({route}) => ({
				tabBarIcon: ({color}) => screenOptions(route, color)
			})}
		>
			<Tab.Screen name="home" options={{title: 'Home'}} component={HomeStack} />
			<Tab.Screen
				name="shop"
				options={{title: 'Mi Compra'}}
				component={ShopStack}
			/>
			<Tab.Screen
				name="settings"
				component={SettingsStack}
				options={{title: 'Contáctanos'}}
			/>
		</Tab.Navigator>
	);
};

function screenOptions(route: any, color: string) {
	let iconName;

	switch (route.name) {
		case 'home':
			iconName = 'home';
			break;
		case 'shop':
			iconName = 'shopping-cart';
			break;

		case 'settings':
			iconName = 'briefcase';
			break;

		default:
			iconName = 'briefcase';
	}
	return (
		<Icon
			name={iconName}
			size={iconName === 'shopping-cart' ? 24 : 22}
			color={color}
		/>
	);
}
