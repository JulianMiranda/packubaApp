import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';

export const InfoScreen = () => {
	const navigation = useNavigation();
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.title}>Bienvenido a Packuba</Text>

				<Text style={styles.text}>
					- Esta aplicación está hecha para envíos de Ecuador hacia Cuba
				</Text>

				<Text style={styles.text}>
					- Solo se podrá enviar un máximo de 10 paquetes por persona
				</Text>
				<Text style={styles.text}>
					- Se tendrá que contactar obligatoriamente vía Whatsapp al encargado
					para registrar los detalles del envío
				</Text>
			</View>
			<TouchableOpacity
				style={{...styles.button, backgroundColor: colors.card}}
				activeOpacity={0.8}
				onPress={() => navigation.navigate('EnterPhoneScreen')}
			>
				<Text style={styles.textButton}>Comencemos</Text>
			</TouchableOpacity>
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
		padding: 10
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 25,
		alignSelf: 'center'
	},
	text: {
		fontSize: 22,
		fontWeight: '300',
		textAlign: 'left',
		marginVertical: 10
	},
	button: {
		position: 'absolute',
		bottom: 10,
		marginBottom: 10,
		padding: 10,
		paddingHorizontal: 30,
		alignSelf: 'center',
		borderRadius: 6
	},
	textButton: {
		alignSelf: 'center',
		color: 'white',
		fontSize: 18,
		marginHorizontal: 20
	}
});
