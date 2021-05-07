import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useRef} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-easy-toast';
import InfoUser from '../../components/Account/InfoUser';
import SettingsOptions from '../../components/SettingsOptions';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props extends StackScreenProps<any, any> {}
export const SettingsScreen = ({navigation}: Props) => {
	const {user, logOut} = useContext(AuthContext);
	const toastRef = useRef();
	/* let toastRef: any; */
	const {
		theme: {colors}
	} = useContext(ThemeContext);

	return (
		<View>
			{/* <InfoUser toastRef={toastRef} /> */}
			<SettingsOptions />

			<Toast ref={toastRef.current} position="center" opacity={0.9} />
		</View>
	);
};
