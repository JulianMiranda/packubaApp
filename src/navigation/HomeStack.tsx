import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {Category} from '../interfaces/Category.interface';
import {CategoryScreen} from '../screens/Home/CategoryScreen';

export type RootStackParams = {
	HomeScreen: undefined;
	ShopScreen: {color: string};
	CategoryScreen: {category: Category; color: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const HomeStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					headerShown: false
					/* 	title: 'Home',
					headerBackTitleVisible: false */
				}}
			/>
			<Stack.Screen
				name="CategoryScreen"
				component={CategoryScreen}
				options={{
					headerShown: false
					/* 	title: 'Home',
					headerBackTitleVisible: false */
				}}
			/>
		</Stack.Navigator>
	);
};
