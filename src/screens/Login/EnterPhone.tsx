import React, {useState, useRef, useContext, useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView,
	TextInput
} from 'react-native';
/* import normalize from 'react-native-normalize'; */
/* import {useDispatch} from 'react-redux'; */
/* import {ScrollView} from 'react-native-gesture-handler'; */
/* import {SET_USER_PHONE} from '../../../actions'; */
import {useNavigation} from '@react-navigation/native';
/* import IntlPhoneInput from 'react-native-intl-phone-input'; */
import PhoneInput from 'react-native-phone-input';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import firebase from 'firebase';
import * as SecureStore from 'expo-secure-store'; /* 
import strings from '../../../res/strings';
import LoginIcon from '../../../components/Header/loginIcon'; */
import {LoginContext} from '../../context/login/LoginContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const EnterPhoneScreen = () => {
	const {top} = useSafeAreaInsets();
	const navigation = useNavigation();
	const {setPhoneNumber} = useContext(LoginContext);
	/* const dispatch = useDispatch(); */
	const [activeButton, setActiveButton] = useState(true);
	const [phoneNum, setPhoneNum] = useState('');
	const phoneRef = useRef<any>();
	const recaptchaVerifier = useRef<any>();
	useEffect(() => {
		phoneRef.current.focus();
	}, []);
	const onChangePhone = (number: string) => {
		if (phoneRef.current.isValidNumber()) {
			phoneRef.current.blur();
			console.log('number', number);
			setPhoneNumber(number);
			setPhoneNum(number);
			setActiveButton(false);
		}

		/* if (isVerified) {
			setActiveButton(false);
			console.log(unmaskedPhoneNumber);

			const formateNumber =
				dialCode + unmaskedPhoneNumber.substring(1, unmaskedPhoneNumber.length);
			console.log('User entered the following Phone Number - ', formateNumber);
			setPhoneNumber(formateNumber);
			
			setPhoneNum(formateNumber);
		} else {
			setActiveButton(true);
		} */
	};

	const sendVerification = () => {
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		phoneProvider
			.verifyPhoneNumber(phoneNum, recaptchaVerifier.current)
			.then((result) => {
				SecureStore.setItemAsync('recaptcha', result);
				console.log('ReCaptcha response code - ', result);
			});
	};

	const handleConfirm = () => {
		sendVerification();
		navigation.navigate('VerificationCodeScreen');
	};

	return (
		<View style={{padding: 30, top: top + 20}}>
			<Text style={styles.title}>Ingresa tu número de teléfono móvil</Text>
			<View style={styles.image}>
				{/* <LoginIcon /> */}
				<View />

				<PhoneInput
					ref={phoneRef}
					onChangePhoneNumber={onChangePhone}
					initialCountry={'cu'}
					textProps={{
						placeholder: '0962914922'
					}}
					textStyle={{
						color: 'black'
					}}
				/>
			</View>
			<View
				style={{
					borderRadius: 30,
					padding: 10,
					width: '80%',
					marginLeft: '9%'
				}}
			>
				<Button title="OK" disabled={activeButton} onPress={handleConfirm} />
			</View>
			<View style={styles.containerAbout}>
				<Text>
					Si continúas recibirás un mensaje de texto via SMS para verificación.
					Pueden aplicarse las tarifas de mensajes y de datos.
				</Text>
			</View>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				attemptInvisibleVerification
				firebaseConfig={firebase.app().options}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	general: {
		height: '90%'
	},
	image: {
		width: 'auto',
		marginRight: 30,
		marginTop: 10,
		marginLeft: 30,
		marginBottom: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		color: 'black',
		marginBottom: 10,
		fontSize: 18,
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'justify'
	},
	text: {
		color: 'black',
		marginBottom: 10,
		fontSize: 13,
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'justify'
	},
	number: {
		width: '100%',
		borderColor: 'black',
		borderWidth: 0,
		marginBottom: 10,
		borderRadius: 0
	},
	input: {
		backgroundColor: 'blue',
		alignContent: 'center',
		paddingLeft: 40,
		paddingBottom: 10
	},
	containerAbout: {
		flexDirection: 'row',
		marginTop: 30
	}
});
