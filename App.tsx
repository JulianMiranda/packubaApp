import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import firebase from 'firebase';
import {Navigator} from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';
import {firebaseConfig} from './src/utils/firebaseConfig';
import {ThemeProvider} from './src/context/theme/ThemeContext';

const AppState = ({children}: any) => {
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
	}
	return (
		<AuthProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</AuthProvider>
	);
};

const App = () => {
	return (
		<AppState>
			<Navigator />
		</AppState>
	);
};
export default App;
