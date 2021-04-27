import React, {useEffect, useContext} from 'react';
import {
	Text,
	View,
	TextInput,
	Platform,
	KeyboardAvoidingView,
	Keyboard,
	Alert,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../../context/auth/AuthContext';
import {loginStyles} from '../../styles/loginTheme';
import {useForm} from '../../hooks/useForm';
import {Background} from '../../components/Background';
import {WhiteLogo} from '../../components/WhiteLogo';
import {Loading} from '../../components/Loading';
import {PackubaLogo} from '../../components/PackubaLogo';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
	const {wait, signIn, errorMessage, removeError} = useContext(AuthContext);

	const {email, password, onChange} = useForm({
		email: '',
		password: ''
	});

	useEffect(() => {
		if (errorMessage.length === 0) return;

		Alert.alert('Login incorrecto', errorMessage, [
			{
				text: 'Ok',
				onPress: removeError
			}
		]);
	}, [errorMessage]);

	const onLogin = () => {
		console.log({email, password});
		Keyboard.dismiss();
		signIn({email, password});
	};

	return (
		<>
			{/* Background */}
			<Background />

			<KeyboardAvoidingView
				style={{flex: 1}}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<View style={loginStyles.formContainer}>
					{/* Keyboard avoid view */}
					<PackubaLogo />

					<Text style={loginStyles.title}>Login</Text>

					<Text style={loginStyles.label}>Email:</Text>
					<TextInput
						placeholder="Ingrese su email:"
						placeholderTextColor="rgba(255,255,255,0.4)"
						keyboardType="email-address"
						underlineColorAndroid="white"
						style={[
							loginStyles.inputField,
							Platform.OS === 'ios' && loginStyles.inputFieldIOS
						]}
						selectionColor="white"
						onChangeText={(value) => onChange(value, 'email')}
						value={email}
						onSubmitEditing={onLogin}
						autoCapitalize="none"
						autoCorrect={false}
					/>

					<Text style={loginStyles.label}>Contraseña:</Text>
					<TextInput
						placeholder="******"
						placeholderTextColor="rgba(255,255,255,0.4)"
						underlineColorAndroid="white"
						secureTextEntry
						style={[
							loginStyles.inputField,
							Platform.OS === 'ios' && loginStyles.inputFieldIOS
						]}
						selectionColor="white"
						onChangeText={(value) => onChange(value, 'password')}
						value={password}
						onSubmitEditing={onLogin}
						autoCapitalize="none"
						autoCorrect={false}
					/>

					{/* Boton login */}
					<View style={loginStyles.buttonContainer}>
						<TouchableOpacity
							activeOpacity={wait ? 1 : 0.8}
							style={loginStyles.button}
							onPress={wait ? () => {} : onLogin}
						>
							<Text style={loginStyles.buttonText}>
								{wait ? <ActivityIndicator /> : 'Login'}
							</Text>
						</TouchableOpacity>
					</View>

					{/* Crear una nueva cuenta */}
					<View style={loginStyles.newUserContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => navigation.replace('RegisterScreen')}
						>
							<Text style={loginStyles.buttonText}>Crear cuenta</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</>
	);
};
