import React, {useState, useRef, useContext, useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView,
	TextInput,
	Platform,
	TouchableOpacity
} from 'react-native';
/* import normalize from 'react-native-normalize'; */
/* import {useDispatch} from 'react-redux'; */
/* import {ScrollView} from 'react-native-gesture-handler'; */
/* import {SET_USER_PHONE} from '../../../actions'; */
import {useNavigation} from '@react-navigation/native';
/* import IntlPhoneInput from 'react-native-intl-phone-input'; */
import PhoneInput from 'react-native-phone-input'; /* 
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'; */
import firebase from 'firebase';
import {
	FirebaseRecaptchaVerifierModal,
	FirebaseRecaptchaBanner
} from 'expo-firebase-recaptcha';
import * as SecureStore from 'expo-secure-store'; /* 
import strings from '../../../res/strings';
import LoginIcon from '../../../components/Header/loginIcon'; */
import {LoginContext} from '../../context/login/LoginContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../../context/theme/ThemeContext';

export const EnterPhoneScreen = () => {
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	const inputRef = useRef<any>();
	const recaptchaVerifier = useRef(null);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [verificationId, setVerificationId] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [showCode, setShowCode] = useState(false);
	const firebaseConfig = firebase.apps.length
		? firebase.app().options
		: undefined;
	const [message, showMessage] = useState({
		text: '',
		color: 'green'
	});
	const onChangePhone = (number: string) => {
		if (inputRef.current.isValidNumber()) {
			inputRef.current.blur();
			console.log('number', number);
			setPhoneNumber(number);
			/* setPhoneNum(number);
			setActiveButton(false); */
		}
	};
	const attemptInvisibleVerification = true;
	const a = () => firebase.auth().signOut();

	return (
		<View style={{padding: 20, marginTop: 50}}>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
				attemptInvisibleVerification={attemptInvisibleVerification}
			/>
			{!showCode ? (
				<>
					<Text style={styles.title}>Ingresa tu número de teléfono móvil</Text>
					<View style={{marginLeft: 10}}>
						<PhoneInput
							ref={inputRef}
							onChangePhoneNumber={onChangePhone}
							initialCountry={'cu'}
							textProps={{
								placeholder: '0962914922'
							}}
							flagStyle={{
								width: 40,
								height: 25,
								borderWidth: 0
							}}
							textStyle={{
								color: 'black',
								fontSize: 25,
								backgroundColor: '#DBEBFF',
								borderBottomColor: 'rgba(0,0,0,0.92)',
								borderBottomWidth: 2,
								height: 30,
								marginRight: 15
							}}
							style={{
								height: 45
							}}
						/>
					</View>

					<TouchableOpacity
						activeOpacity={phoneNumber ? 0.8 : 1}
						style={{
							backgroundColor: phoneNumber ? colors.card : '#abcffa',
							alignSelf: 'center',
							borderRadius: 16,
							marginTop: 15
						}}
						onPress={
							phoneNumber
								? async () => {
										// The FirebaseRecaptchaVerifierModal ref implements the
										// FirebaseAuthApplicationVerifier interface and can be
										// passed directly to `verifyPhoneNumber`.
										try {
											const phoneProvider = new firebase.auth.PhoneAuthProvider();

											const verificationId = await phoneProvider.verifyPhoneNumber(
												phoneNumber,
												recaptchaVerifier.current!
											);
											setVerificationId(verificationId);
											showMessage({
												text: 'Código de verificación enviado',
												color: 'green'
											});
											setShowCode(true);
										} catch (err) {
											showMessage({
												text: `Error: ${err.message}`,
												color: 'red'
											});
										}
								  }
								: () => {}
						}
					>
						<Text style={{textAlign: 'center', margin: 10, color: 'white'}}>
							Enviar código
						</Text>
					</TouchableOpacity>
				</>
			) : (
				<>
					<Text style={styles.title}>Ingresa el código enviado</Text>
					<TextInput
						style={{
							marginVertical: 10,
							padding: 3,
							borderBottomColor: 'black',
							borderBottomWidth: 1,
							fontSize: 20,
							backgroundColor: '#abcffa'
						}}
						editable={!!verificationId}
						placeholder="123456"
						keyboardType="number-pad"
						onChangeText={setVerificationCode}
					/>
					<TouchableOpacity
						activeOpacity={
							verificationCode.length === 6 && verificationId ? 0.8 : 1
						}
						style={{
							backgroundColor:
								verificationCode.length === 6 && verificationId
									? colors.card
									: '#f8f8f8',
							alignSelf: 'center',
							borderRadius: 16,
							marginTop: 15
						}}
						onPress={
							verificationCode.length === 6 && verificationId
								? async () => {
										try {
											const credential = firebase.auth.PhoneAuthProvider.credential(
												verificationId,
												verificationCode
											);
											const result = await firebase
												.auth()
												.signInWithCredential(credential);
											const {additionalUserInfo, user} = result;
											console.log('user', user);
											console.log('additionalUserInfo', additionalUserInfo);

											showMessage({
												text: 'Phone authentication successful 👍',
												color: 'green'
											});
										} catch (err) {
											showMessage({
												text: `Error: ${err.message}`,
												color: 'red'
											});
										}
								  }
								: () => {}
						}
					>
						<Text style={{textAlign: 'center', margin: 10, color: 'white'}}>
							Confirmar código
						</Text>
					</TouchableOpacity>
				</>
			)}
			{message ? (
				<TouchableOpacity
					style={{backgroundColor: 'white', justifyContent: 'center'}}
					onPress={() => showMessage({text: '', color: 'white'})}
				>
					<Text
						style={{
							color: message.color || 'blue',
							fontSize: 17,
							textAlign: 'center',
							margin: 20
						}}
					>
						{message.text}
					</Text>
				</TouchableOpacity>
			) : undefined}
			{attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
			<TouchableOpacity
				style={{backgroundColor: 'white', justifyContent: 'center'}}
				onPress={() => a()}
			>
				<Text
					style={{
						color: message.color || 'blue',
						fontSize: 17,
						textAlign: 'center',
						margin: 20
					}}
				>
					Deslog
				</Text>
			</TouchableOpacity>
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
		marginBottom: 30,
		fontSize: 18,
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
