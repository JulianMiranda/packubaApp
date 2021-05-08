import React, {createContext, useEffect, useReducer} from 'react';
import firebase from 'firebase';

import {getHeaders} from '../../api/getHeaders';

import api from '../../api/api';
import {User, LoginData, RegisterData} from '../../interfaces/User.interface';

import {authReducer, AuthState} from './authReducer';
import {registerForPushNotifications} from '../../utils/notificationPermissions';

type AuthContextProps = {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	wait: boolean;
	user: User | null;
	errorMessage: string;
	signUpPhone: (name: string) => void;
	signInPhone: () => void;
	logOut: () => void;
	removeError: () => void;
};

const authInicialState: AuthState = {
	status: 'checking',
	wait: false,
	user: null,
	errorMessage: ''
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
	const [state, dispatch] = useReducer(authReducer, authInicialState);

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async (isLogin = false) => {
		const headers = await getHeaders();

		// No token, no autenticado
		if (!headers.get('x-token')) return dispatch({type: 'notAuthenticated'});

		// Hay token
		try {
			const resp = await api.get<User>('/login');

			if (resp.status !== 200) {
				return dispatch({type: 'notAuthenticated'});
			}
			if (isLogin && resp.data.role === 'JUN') {
				const notificationTokens = await registerForPushNotifications();
				if (notificationTokens !== '')
					api.put(`/users/update/${resp.data.id}`, {
						notificationTokens: [notificationTokens]
					});
			}
			dispatch({
				type: 'signUp',
				payload: {
					user: resp.data
				}
			});
		} catch (error) {
			console.log('Error Login', error);
			return dispatch({type: 'notAuthenticated'});
		}
	};

	const signInPhone = () => {
		try {
			dispatch({type: 'initCheck'});
			checkToken(true);
		} catch (error) {
			console.log('catch', error);
			dispatch({
				type: 'addError',
				payload: 'Error Catch'
			});
		}
	};

	const signUpPhone = async (name: string) => {
		dispatch({type: 'initCheck'});
		try {
			await firebase
				.auth()
				.currentUser?.updateProfile({
					displayName: name.trim()
				})
				.then(async () => {
					let forceRefresh;
					await firebase.auth().currentUser?.getIdToken((forceRefresh = true));
					checkToken(true);
				})
				.catch(() =>
					dispatch({
						type: 'addError',
						payload: 'Error al actualizar nombre'
					})
				);
		} catch (error) {
			dispatch({
				type: 'addError',
				payload: 'Error al actualizar nombre'
			});
		}
	};

	const logOut = async () => {
		firebase.auth().signOut();
		dispatch({type: 'logout'});
	};

	const removeError = () => {
		dispatch({type: 'removeError'});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				logOut,
				removeError,
				signInPhone,
				signUpPhone
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
