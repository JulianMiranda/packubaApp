import React, {useState, useRef, useContext, useEffect} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input';
import firebase from 'firebase';
import {
	FirebaseRecaptchaVerifierModal,
	FirebaseRecaptchaBanner
} from 'expo-firebase-recaptcha';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell
} from 'react-native-confirmation-code-field';
import {AuthContext} from '../../context/auth/AuthContext';

export const EnterPhoneScreen = () => {
	const navigation = useNavigation();
	const CELL_COUNT = 6;
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	const {signInPhone, wait, signIn, errorMessage, removeError} = useContext(
		AuthContext
	);
	const inputRef = useRef<any>();
	const recaptchaVerifier = useRef(null);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [verificationId, setVerificationId] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const codeRef = useBlurOnFulfill({
		value: verificationCode,
		cellCount: CELL_COUNT
	});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: verificationCode,
		setValue: setVerificationCode
	});
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
			setPhoneNumber(number);
		}
	};
	const attemptInvisibleVerification = true;
	const a = () => firebase.auth().signOut();
	useEffect(() => {
		if (errorMessage.length === 0) return;

		Alert.alert('Login incorrecto', errorMessage, [
			{
				text: 'Ok',
				onPress: removeError
			}
		]);
	}, [errorMessage]);

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
							initialCountry={'ec'}
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
										try {
											const phoneProvider = new firebase.auth.PhoneAuthProvider();
											const verificationId = await phoneProvider.verifyPhoneNumber(
												phoneNumber,
												recaptchaVerifier.current!
											);
											setVerificationId(verificationId);
											showMessage({
												text:
													'Se ha enviado un código de verificación a tu número celular',
												color: 'green'
											});
											setShowCode(true);
										} catch (err) {
											showMessage({
												text: `Error: ${err.message}`,
												color: '#f73434'
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
					<CodeField
						ref={codeRef}
						{...props}
						value={verificationCode}
						onChangeText={setVerificationCode}
						cellCount={CELL_COUNT}
						rootStyle={styles.codeFieldRoot}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({index, symbol, isFocused}) => (
							<Text
								key={index}
								style={[styles.cell, isFocused && styles.focusCell]}
								onLayout={getCellOnLayoutHandler(index)}
							>
								{symbol || (isFocused ? <Cursor /> : null)}
							</Text>
						)}
					/>

					<TouchableOpacity
						activeOpacity={
							verificationCode.length === 6 && verificationId ? 0.8 : 1
						}
						style={{
							backgroundColor:
								verificationCode.length === 6 && verificationId
									? colors.card
									: '#abcffa',
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
											const {user} = result;

											if (user?.displayName === null) {
												navigation.navigate('RegisterNameScreen');
											} else {
												signInPhone();
											}
											/* showMessage({
												text: 'Phone authentication successful 👍',
												color: 'green'
											}); */
										} catch (err) {
											showMessage({
												text: `Error: ${err.message}`,
												color: '#f73434'
											});
										}
								  }
								: () => {}
						}
					>
						<Text style={{textAlign: 'center', margin: 10, color: 'white'}}>
							{wait ? (
								<ActivityIndicator
									color={'white'}
									style={{marginHorizontal: 42, marginVertical: -1}}
								/>
							) : (
								'Confirmar código'
							)}
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
			{/* <TouchableOpacity
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
			</TouchableOpacity> */}
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
	},
	codeFieldRoot: {marginTop: 20},
	cell: {
		width: 40,
		height: 40,
		lineHeight: 38,
		fontSize: 24,
		borderWidth: 2,
		borderColor: '#00000030',
		textAlign: 'center'
	},
	focusCell: {
		borderColor: '#000'
	}
});
