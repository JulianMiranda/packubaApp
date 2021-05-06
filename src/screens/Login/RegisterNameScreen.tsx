import React, {useContext, useState} from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';

export const RegisterNameScreen = () => {
	const {signUpPhone} = useContext(AuthContext);
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	const [name, setName] = useState('');
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Ayúdanos con tu nombre</Text>
			<TextInput value={name} onChangeText={setName} style={styles.input} />
			<TouchableOpacity
				activeOpacity={0.8}
				style={{
					...styles.button,
					backgroundColor: name.trim().length > 0 ? colors.card : '#abcffa'
				}}
				onPress={
					name.trim().length > 0 ? () => signUpPhone(name.trim()) : () => {}
				}
			>
				<Text style={styles.textButton}>Guardar</Text>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 30
	},
	title: {
		color: 'black',
		marginBottom: 30,
		fontSize: 24,
		marginRight: 10,
		textAlign: 'justify'
	},
	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 2,
		backgroundColor: '#DBEBFF',
		height: 35,
		fontSize: 22
	},
	button: {
		marginTop: 20,
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
