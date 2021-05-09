import React, {useContext} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TabsNavigation} from './TabsNavigation';

import {AuthContext} from '../context/auth/AuthContext';
import {ThemeContext} from '../context/theme/ThemeContext';

import {Loading} from '../components/Loading';
import {EnterPhoneScreen} from '../screens/Login/EnterPhone';
import {VerificationCodeScreen} from '../screens/Login/VerificationCode';
import {InfoScreen} from '../screens/Login/InfoScreen';
import {RegisterNameScreen} from '../screens/Login/RegisterNameScreen';

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
							<Stack.Screen name="InfoScreen" component={InfoScreen} />
							<Stack.Screen
								name="EnterPhoneScreen"
								component={EnterPhoneScreen}
							/>
							{/* <Stack.Screen
								name="VerificationCodeScreen"
								component={VerificationCodeScreen}
							/> */}
							<Stack.Screen
								name="RegisterNameScreen"
								component={RegisterNameScreen}
							/>
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
