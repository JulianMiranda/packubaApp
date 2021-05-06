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
	signUp: (registerData: RegisterData) => void;
	signUpPhone: (name: string) => void;
	signIn: (loginData: LoginData) => void;
	logOut: () => void;
	removeError: () => void;
	signInPhone: () => void;
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

	const signIn = async ({email, password}: LoginData) => {
		try {
			dispatch({type: 'initCheck'});
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					checkToken(true);
				})
				.catch((err) => {
					dispatch({
						type: 'addError',
						payload: 'Usuario o contraseña incorrecta'
					});
					console.log('err', err);
				});
		} catch (error) {
			console.log('catch', error);
			dispatch({
				type: 'addError',
				payload: 'Error Catch'
			});
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

	const signUp = async ({name, email, password}: RegisterData) => {
		dispatch({type: 'initCheck'});
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(({user}) => {
				user
					?.updateProfile({displayName: name})
					.then(async () => {
						let forceRefresh;
						await firebase
							.auth()
							.currentUser?.getIdToken((forceRefresh = true));
						checkToken(true);
					})
					.catch(() =>
						dispatch({
							type: 'addError',
							payload: 'Error al actualizar nombre'
						})
					);
			})
			.catch(() =>
				dispatch({type: 'addError', payload: 'Error al crear usuario'})
			);
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
			/* let forceRefresh;
			await firebase.auth().currentUser?.getIdToken((forceRefresh = true));
			checkToken(true); */
		} catch (error) {
			dispatch({
				type: 'addError',
				payload: 'Error al actualizar nombre'
			});
		}

		/* ?.updateProfile({displayName: name})
					.then(async () => {
						let forceRefresh;
						await firebase
							.auth()
							.currentUser?.getIdToken((forceRefresh = true));
						checkToken(true);
					})
					.catch(() =>
						dispatch({
							type: 'addError',
							payload: 'Error al actualizar nombre'
						})
					);
			})
			.catch(() =>
				dispatch({type: 'addError', payload: 'Error al crear usuario'})
			); */
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
				signUp,
				signIn,
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
