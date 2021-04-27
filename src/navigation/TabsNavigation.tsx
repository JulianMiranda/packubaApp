import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SettingsStack} from './SettingsStack';
import {HomeStack} from './HomeStack';
import {ThemeContext} from '../context/theme/ThemeContext';

const Tab = createBottomTabNavigator();

export const TabsNavigation = () => {
	const {
		theme: {colors}
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
				activeTintColor: colors.primary
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
