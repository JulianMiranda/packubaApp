import React, {createContext, useEffect, useReducer} from 'react';
import firebase from 'firebase';

import {getHeaders} from '../../api/getHeaders';

import vidaApi from '../../api/vidaApi';
import {User, LoginData, RegisterData} from '../../interfaces/User.interface';

import {authReducer, AuthState} from './authReducer';

type AuthContextProps = {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	wait: boolean;
	user: User | null;
	errorMessage: string;
	signUp: (registerData: RegisterData) => void;
	signIn: (loginData: LoginData) => void;
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

	const checkToken = async () => {
		const headers = await getHeaders();

		// No token, no autenticado
		if (!headers.get('x-token')) return dispatch({type: 'notAuthenticated'});

		// Hay token
		try {
			const resp = await vidaApi.get<User>('/login');
			if (resp.status !== 200) {
				return dispatch({type: 'notAuthenticated'});
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
					checkToken();
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
						checkToken();
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
				removeError
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
