import React from 'react';
import firebase from 'firebase';
import {Navigator} from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';
import {firebaseConfig} from './src/utils/firebaseConfig';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {ShopProvider} from './src/context/shop/ShopContext';
import moment from 'moment';
import 'moment/locale/es';
import {LoginProvider} from './src/context/login/LoginContext';
moment.locale('es');

const AppState = ({children}: any) => {
	if (firebase.apps.length === 0) {
		firebase.initializeApp(firebaseConfig);
	}
	return (
		<AuthProvider>
			<ThemeProvider>
				<LoginProvider>
					<ShopProvider>{children}</ShopProvider>
				</LoginProvider>
			</ThemeProvider>
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
