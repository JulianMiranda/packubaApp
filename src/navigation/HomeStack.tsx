import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					title: 'Home',
					headerBackTitleVisible: false
				}}
			/>
		</Stack.Navigator>
	);
};
