import React, {
	createContext,
	useEffect,
	useReducer,
	useRef,
	useState
} from 'react';
import {AppState} from 'react-native';
import {Appearance} from 'react-native-appearance';
import {ThemeState, themeReducer, lightTheme, darkTheme} from './themeReducer';

interface ThemeContextProps {
	theme: ThemeState;
	setDarkTheme: () => void;
	setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: any) => {
	/* const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current); */
	//const colorScheme = useColorScheme();

	/* useEffect(() => {
		AppState.addEventListener('change', _handleAppStateChange);

		return () => {
			AppState.removeEventListener('change', _handleAppStateChange);
		};
	}, []);

	const _handleAppStateChange = (nextAppState: any) => {
		if (
			appState.current.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			console.log('App has come to the foreground!');
			Appearance.getColorScheme() === 'light'
				? setLightTheme()
				: setDarkTheme();
		}

		appState.current = nextAppState;
		setAppStateVisible(appState.current);
		console.log('AppState', appState.current);
	};
 */
	const [theme, dispatch] = useReducer(
		themeReducer,
		Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme
	);

	useEffect(() => {
		AppState.addEventListener('change', (status) => {
			if (status === 'active') {
				Appearance.getColorScheme() === 'light'
					? setLightTheme()
					: setDarkTheme();
			}
		});
	}, []);

	// SOLO EN IOS por ahora
	// useEffect(() => {

	// (colorScheme === 'light')
	//     ? setLightTheme()
	//     : setDarkTheme();

	// }, [colorScheme])

	const setDarkTheme = () => {
		dispatch({type: 'set_dark_theme'});
		console.log('setDarkTheme');
	};

	const setLightTheme = () => {
		dispatch({type: 'set_light_theme'});
		console.log('setLightTheme');
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setDarkTheme,
				setLightTheme
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
