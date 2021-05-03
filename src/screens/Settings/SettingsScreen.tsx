import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useRef} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import Toast from 'react-native-easy-toast';
import InfoUser from '../../components/Account/InfoUser';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props extends StackScreenProps<any, any> {}
export const SettingsScreen = ({navigation}: Props) => {
	const {user, logOut} = useContext(AuthContext);
	const toastRef = useRef();
	/* let toastRef: any; */
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<View>
			<InfoUser toastRef={toastRef} />

			<TouchableOpacity
				onPress={() => navigation.navigate('ChangeThemeScreen')}
				style={{
					backgroundColor: '#f0f0f0',
					marginTop: 15,
					/* marginLeft: 100, */
					padding: 7,
					width: '100%',
					alignItems: 'center',
					borderWidth: 1,
					borderColor: '#c5b8b8' /* 
					borderRadius: 60 */
				}}
			>
				<Text style={{color: colors.text, textAlign: 'center'}}>
					Cambiar Tema
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() =>
					Linking.openURL(
						'http://api.whatsapp.com/send?text=Este es un mensaje predetermidado&phone=+593995687985'
					)
				}
				style={{
					backgroundColor: '#f0f0f0',
					marginTop: 15,
					/* marginLeft: 100, */
					padding: 7,
					width: '100%',
					alignItems: 'center',
					borderWidth: 1,
					borderColor: '#c5b8b8' /* 
					borderRadius: 60 */
				}}
			>
				<Text style={{color: colors.text, textAlign: 'center'}}>
					Contactar por Whatsapp
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={logOut}
				style={{
					backgroundColor: '#f0f0f0',
					marginTop: 15,
					/* marginLeft: 100, */
					padding: 7,
					width: '100%',
					alignItems: 'center',
					borderWidth: 1,
					borderColor: '#c5b8b8' /* 
					borderRadius: 60 */
				}}
			>
				<Text style={{color: '#fc3535', textAlign: 'center'}}>
					Cerrar Sesión
				</Text>
			</TouchableOpacity>
			<Toast ref={toastRef.current} position="center" opacity={0.9} />
		</View>
	);
};
