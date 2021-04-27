import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';

export const HomeScreen = () => {
	const {user, logOut} = useContext(AuthContext);
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<View>
			<Text style={{color: colors.text}}>{JSON.stringify(user, null, 2)}</Text>
			<TouchableOpacity
				onPress={logOut}
				style={{
					backgroundColor: colors.notification,
					marginTop: 15,
					marginLeft: 100,
					padding: 7,
					alignItems: 'center',
					width: 90,
					borderWidth: 1,
					borderRadius: 60
				}}
			>
				<Text style={{color: colors.text, textAlign: 'center'}}>Log Out</Text>
			</TouchableOpacity>
		</View>
	);
};
