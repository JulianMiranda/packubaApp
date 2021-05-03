import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {FontAwesome as Icon} from '@expo/vector-icons';
import {TabBg} from '../svg';
import {ThemeContext} from '../context/theme/ThemeContext';

type Props = BottomTabBarButtonProps & {
	bgColor?: string;
};

export const TabBarAdvancedButton: React.FC<Props> = ({bgColor, ...props}) => {
	const {
		theme: {colors}
	} = useContext(ThemeContext);

	return (
		<View style={styles.container} pointerEvents="box-none">
			<TabBg color={'rgba(255,255,255,0.92)'} style={styles.background} />
			<TouchableOpacity
				activeOpacity={0.8}
				style={{...styles.button, backgroundColor: colors.primary}}
				onPress={props.onPress}
			>
				<Icon name="shopping-cart" style={styles.buttonIcon} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		width: 75,
		alignItems: 'center'
	},
	background: {
		position: 'absolute',
		top: 0
	},
	button: {
		top: -22.5,
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		borderRadius: 27
	},
	buttonIcon: {
		fontSize: 22,
		color: '#ecece4'
	}
});
