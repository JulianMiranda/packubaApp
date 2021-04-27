import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props extends StackScreenProps<any, any> {}
export const SettingsScreen = ({navigation}: Props) => {
	const {user} = useContext(AuthContext);
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<View>
			<TouchableOpacity
				onPress={() => navigation.navigate('ChangeThemeScreen')}
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
				<Text style={{color: colors.text, textAlign: 'center'}}>
					Cambiar Tema
				</Text>
			</TouchableOpacity>
		</View>
	);
};
