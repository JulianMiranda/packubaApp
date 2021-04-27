import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TabsNavigation} from './TabsNavigation';

import {AuthContext} from '../context/auth/AuthContext';
import {ThemeContext} from '../context/theme/ThemeContext';

import {LoginScreen} from '../screens/Login/LoginScreen';
import {RegisterScreen} from '../screens/Login/RegisterScreen';
import {Loading} from '../components/Loading';

const Stack = createStackNavigator();

export const Navigator = () => {
	const {status} = useContext(AuthContext);
	const {theme} = useContext(ThemeContext);

	if (status === 'checking') return <Loading />;

	return (
		<View style={{backgroundColor: theme.colors.background, flex: 1}}>
			<NavigationContainer theme={theme}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						cardStyle: {
							/* 	backgroundColor: 'white' */
						}
					}}
				>
					{status !== 'authenticated' ? (
						<>
							<Stack.Screen name="LoginScreen" component={LoginScreen} />
							<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
						</>
					) : (
						<Stack.Screen
							name="Tabs"
							component={TabsNavigation}
							options={{headerShown: false}}
						/>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
};
