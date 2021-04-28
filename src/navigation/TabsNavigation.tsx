import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SettingsStack} from './SettingsStack';
import {HomeStack} from './HomeStack';
import {ThemeContext} from '../context/theme/ThemeContext';
import {Platform} from 'react-native';

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
			<Tab.Screen name="home" component={HomeStack} />
			<Tab.Screen
				name="settings"
				component={SettingsStack}
				options={{title: 'Settings'}}
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
		case 'settings':
			iconName = 'briefcase';
			break;

		default:
			iconName = 'briefcase';
	}
	return <Icon name={iconName} size={22} color={color} />;
}
