import React, {createContext, useContext, useEffect, useReducer} from 'react';
import firebase from 'firebase';

import {loginReducer, LoginState} from './loginReducer';
import {AuthContext} from '../auth/AuthContext';

type LoginContextProps = {
	status: 'input-phone' | 'input-code' | 'input-name';
	wait: boolean;
	phoneNumber: string;
	verificationCode: string;
	name: string;
	errorMessage: string;
	removeError: () => void;
	showInputPhone: () => void;
	showInputCode: () => void;
	showInputName: () => void;
	setPhoneNumber: (phoneNumber: string) => void;
	setVerificationCode: (verificationCode: string) => void;
	setName: (name: string) => void;
};

const loginInicialState: LoginState = {
	status: 'input-phone',
	wait: false,
	phoneNumber: '',
	verificationCode: '',
	name: '',
	errorMessage: ''
};

export const LoginContext = createContext({} as LoginContextProps);

export const LoginProvider = ({children}: any) => {
	const [state, dispatch] = useReducer(loginReducer, loginInicialState);
	const {signInPhone, signUpPhone} = useContext(AuthContext);

	const setPhoneNumber = (phoneNumber: string) => {
		dispatch({type: 'setPhoneNumber', payload: phoneNumber});
	};

	const setVerificationCode = (verificationCode: string) => {
		dispatch({type: 'setCode', payload: verificationCode});
	};

	const setName = (name: string) => {
		dispatch({type: 'setName', payload: name});
	};

	const removeError = () => {
		dispatch({type: 'removeError'});
	};
	const showInputPhone = () => {
		dispatch({type: 'setInputPhone'});
	};
	const showInputCode = () => {
		dispatch({type: 'setInputCode'});
	};
	const showInputName = () => {
		dispatch({type: 'setInputName'});
	};

	return (
		<LoginContext.Provider
			value={{
				...state,
				removeError,
				setPhoneNumber,
				setVerificationCode,
				setName,
				showInputPhone,
				showInputCode,
				showInputName
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};
