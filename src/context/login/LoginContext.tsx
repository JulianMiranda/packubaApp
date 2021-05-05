import React, {createContext, useEffect, useReducer} from 'react';
import firebase from 'firebase';

import {loginReducer, LoginState} from './loginReducer';

type LoginContextProps = {
	phoneNumber: string | null;
	code: string | null;
	setPhoneNumber: (phoneNumber: string) => void;
	setCode: (code: string) => void;
};

const loginInicialState: LoginState = {
	phoneNumber: null,
	code: null
};

export const LoginContext = createContext({} as LoginContextProps);

export const LoginProvider = ({children}: any) => {
	const [state, dispatch] = useReducer(loginReducer, loginInicialState);

	const setPhoneNumber = (phoneNumber: string) => {
		dispatch({type: 'setPhoneNumber', payload: {phoneNumber}});
	};

	const setCode = (code: string) => {
		dispatch({type: 'setCode', payload: {code}});
	};

	return (
		<LoginContext.Provider
			value={{
				...state,
				setPhoneNumber,
				setCode
			}}
		>
			{children}
		</LoginContext.Provider>
	);
};
