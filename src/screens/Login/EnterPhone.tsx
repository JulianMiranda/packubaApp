import React, {useState, useRef, useContext, useEffect} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	TextInput,
	Dimensions
} from 'react-native';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/auth/AuthContext';
import {LoginContext} from '../../context/login/LoginContext';
import {loginStyles} from '../../styles/loginTheme';
import {Loading} from '../../components/Loading';

interface Props extends StackScreenProps<any, any> {}

export const EnterPhoneScreen = ({navigation}: Props) => {
	const {top} = useSafeAreaInsets();
	const CELL_COUNT = 6;
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	const {
		signInPhone,
		signUpPhone,
		wait,
		errorMessage,
		removeError
	} = useContext(AuthContext);

	const {
		status,
		name,
		setName,
		phoneNumber,
		setPhoneNumber,
		verificationCode,
		setVerificationCode,
		showInputPhone,
		showInputCode,
		showInputName
	} = useContext(LoginContext);
	const inputRef = useRef<any>();
	const recaptchaVerifier = useRef(null);
	const {height, width} = Dimensions.get('window');
	const [verificationId, setVerificationId] = useState('');
	const codeRef = useBlurOnFulfill({
		value: verificationCode,
		cellCount: CELL_COUNT
	});
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: verificationCode,
		setValue: setVerificationCode
	});
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
		<>
			{status === 'input-code' && (
				<TouchableOpacity
					onPress={() => showInputPhone()}
					activeOpacity={0.8}
					style={{
						...loginStyles.backButton,
						top: top + 5
					}}
				>
					<Icon name="arrow-back-outline" color="black" size={35} />
				</TouchableOpacity>
			)}

			<View style={{padding: 20, marginTop: 50}}>
				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={firebaseConfig}
					attemptInvisibleVerification={attemptInvisibleVerification}
				/>
				{status === 'input-phone' && (
					<>
						<Text style={loginStyles.title}>
							Ingresa tu número de teléfono móvil
						</Text>
						<View style={{marginLeft: 10}}>
							<PhoneInput
								ref={inputRef}
								onChangePhoneNumber={onChangePhone}
								initialCountry={'ec'}
								textProps={{
									placeholder: '0962914922'
								}}
								flagStyle={loginStyles.flagStyle}
								textStyle={loginStyles.flagInputText}
								style={{height: 45}}
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
													color: '#424040'
												});
												showInputCode();
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
				)}
				{status === 'input-code' && (
					<>
						<Text style={loginStyles.title}>Ingresa el código enviado</Text>
						<CodeField
							ref={codeRef}
							{...props}
							value={verificationCode}
							onChangeText={setVerificationCode}
							cellCount={CELL_COUNT}
							rootStyle={loginStyles.codeFieldRoot}
							keyboardType="number-pad"
							textContentType="oneTimeCode"
							renderCell={({index, symbol, isFocused}) => (
								<Text
									key={index}
									style={[loginStyles.cell, isFocused && loginStyles.focusCell]}
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
													showInputName();
												} else {
													signInPhone();
												}
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
								'Confirmar código'
							</Text>
						</TouchableOpacity>
					</>
				)}

				{status === 'input-name' && (
					<>
						<Text style={loginStyles.title}>Ayúdanos con tu nombre</Text>
						<TextInput
							value={name}
							onChangeText={setName}
							style={loginStyles.input}
						/>
						<TouchableOpacity
							activeOpacity={0.8}
							style={{
								marginTop: 20,
								padding: 10,
								paddingHorizontal: 30,
								alignSelf: 'center',
								borderRadius: 6,
								backgroundColor:
									name.trim().length > 0 ? colors.card : '#abcffa'
							}}
							onPress={
								name.trim().length > 0
									? () => signUpPhone(name.trim())
									: () => {}
							}
						>
							<Text
								style={{
									alignSelf: 'center',
									color: 'white',
									fontSize: 18,
									marginHorizontal: 20
								}}
							>
								Guardar
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
			</View>
			{wait && (
				<View
					style={{
						position: 'absolute',
						backgroundColor: 'rgba(255,255,255,0.72)',
						zIndex: 999999999999,
						height,
						width
					}}
				>
					<Loading />
				</View>
			)}
		</>
	);
};
