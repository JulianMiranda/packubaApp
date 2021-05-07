import React, {useContext} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Linking,
	ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/auth/AuthContext';

type Key = 'historial' | 'whatsapp' | 'logout';

export default function SettingsOptions() {
	const navigation = useNavigation();
	const {user, logOut} = useContext(AuthContext);

	const selectedComponent = (key: Key) => {
		switch (key) {
			case 'historial':
				navigation.navigate('OrdersScreen');
				break;
			case 'whatsapp':
				Linking.openURL(
					'http://api.whatsapp.com/send?text=Este es un mensaje predetermidado&phone=+593995687985'
				);
				break;
			case 'logout':
				logOut();
				break;
		}
	};
	const menuOptions = generateOptions(selectedComponent);

	return (
		<ScrollView>
			{menuOptions.map((menu, index) => (
				<View
					key={index.toString()}
					style={{flexDirection: 'row', marginVertical: 10, marginLeft: 10}}
				>
					<Icon name={menu.iconNameLeft} color="#ccc" size={32} />
					<TouchableOpacity
						onPress={menu.onPress}
						style={{
							width: '80%',
							alignItems: 'flex-start',
							justifyContent: 'center',
							marginLeft: 10
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 22,
								fontWeight: '500',
								color: '#615e5e'
							}}
						>
							{menu.title}
						</Text>
					</TouchableOpacity>
					{menu.iconNameLeft === 'history' && (
						<TouchableOpacity onPress={menu.onPress}>
							<Icon name={menu.iconNameRight} color="#ccc" size={32} />
						</TouchableOpacity>
					)}
				</View>
			))}
		</ScrollView>
	);
}

function generateOptions(selectedComponent: any) {
	return [
		{
			title: 'Ver historial de compras',
			iconType: 'material-community',
			iconNameLeft: 'history',
			iconNameRight: 'chevron-right',
			onPress: () => selectedComponent('historial')
		},
		{
			title: 'Contáctanos vía Whatsapp',
			iconType: 'material-community',
			iconNameLeft: 'whatsapp',
			iconNameRight: 'chevron-right',
			onPress: () => selectedComponent('whatsapp')
		},
		{
			title: 'Cerrar sesión',
			iconType: 'material-community',
			iconNameLeft: 'power',
			iconNameRight: 'chevron-right',
			onPress: () => selectedComponent('logout')
		}
	];
}

const styles = StyleSheet.create({
	menuItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3e3'
	}
});
