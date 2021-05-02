import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '../screens/Settings/SettingsScreen';
import {ChangeThemeScreen} from '../screens/Settings/ChangeThemeScreen';

const Stack = createStackNavigator();

export const SettingsStack = () => {
	return (
		<Stack.Navigator>
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
		</Stack.Navigator>
	);
};
