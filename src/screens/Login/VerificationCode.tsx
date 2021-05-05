import React, {useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Modal,
	Alert,
	Button,
	TextInput
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';
import * as SecureStore from 'expo-secure-store'; /* 
import {update, getOne} from '../../../api/services';
import {useSelector, useDispatch} from 'react-redux'; */ /* 
import {SET_USER_DATA, LOGIN_SUCESS, SET_USER_ID} from '../../../actions'; */ /* 
import strings from '../../../res/strings';
import showSnackBar from '../../../components/atoms/snackBar/SnackBar'; */
/* import Toast from 'react-native-toast-message'; */
export const VerificationCodeScreen = () => {
	const navigation = useNavigation();

	const [activeButton, setActiveButton] = useState(true);
	const [verificationCode, setVerificationCode] = useState('');
	const [recaptcha, setRecaptcha] = useState('');
	const [isUserExistsonFirebase, setIsUserExistsonFirebase] = useState(false);

	SecureStore.getItemAsync('recaptcha').then((result) => {
		if (result) setRecaptcha(result);
	});

	const onChangeText = (e: any) => {
		if (e.nativeEvent.text.length === 6) {
			setActiveButton(false);
			setVerificationCode(e.nativeEvent.text);
		} else {
			setActiveButton(true);
		}
	};

	const confirmCode = () => {
		const credential = firebase.auth.PhoneAuthProvider.credential(
			recaptcha,
			verificationCode
		);

		firebase
			.auth()
			.signInWithCredential(credential)
			.then((result) => {
				/* SecureStore.setItemAsync('accessToken', JSON.stringify(result.user)); */
				handleConfirm(result);
			})
			.catch((error) => {
				console.log('User has entered wrong SMS validation Code - ', error);
			});
	};

	const handleConfirm = async (result: any) => {
		const {additionalUserInfo, user} = result;
		if (additionalUserInfo.isNewUser) {
			navigation.navigate('register');
		} else if (!additionalUserInfo.isNewUser) {
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					const {claims} = await user.getIdTokenResult();
				} else {
					console.log('Error al conectarse a Firebase 2');
				}
			});
		}
	};

	const handleModalOK = async () => {
		const user = firebase.auth().currentUser;
		if (user)
			user
				.delete()
				.then(() => {
					setIsUserExistsonFirebase(!isUserExistsonFirebase);
					navigation.navigate('login');
				})
				.catch((err) =>
					console.log(
						'There was an error while deleting the User from Firebase - ',
						err
					)
				);
	};

	return (
		<View style={{flex: 1}}>
			<View style={styles.general}>
				<View style={styles.centeredView}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={isUserExistsonFirebase}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>
									Hemos detectado que no finalizaste tu registro con éxito
									anteriormente.{'\n'}
									{'\n'}
									Te invitamos a reiniciar el proceso presionando el botón
									Continuar
								</Text>

								<Button onPress={handleModalOK} title="Continuar"></Button>
							</View>
						</View>
					</Modal>
				</View>

				<TextInput
					onChange={onChangeText}
					placeholder="Código"
					//secureTextEntry={true}
					keyboardType="number-pad"
				/>
				<Text style={{textAlign: 'justify'}}>
					Te enviamos un código a tu celular.{'\n'}Por favor, escríbelo acá.
					¡Esto es por tu seguridad!
				</Text>
			</View>

			<View style={{marginBottom: '2%'}}>
				<Button
					title={'Continuar'}
					disabled={activeButton === false ? false : true}
					onPress={confirmCode}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	general: {
		marginLeft: 20,
		marginTop: 10,
		marginRight: 20,
		marginBottom: 30
	},
	title2: {
		color: 'blue',
		textDecorationLine: 'underline',
		//textAlign: "center",
		//fontSize: 20,
		fontWeight: '500'
		//paddingHorizontal: 20,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 30,
		textAlign: 'justify'
	},
	button: {
		borderRadius: 30,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		color: '#fff',
		backgroundColor: '#a61f1f',
		width: '40%',
		alignSelf: 'flex-end'
	}
});
