import React, {useContext} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';

export const ChangeThemeScreen = () => {
	const {
		setDarkTheme,
		setLightTheme,
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center'
			}}
		>
			<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
				<TouchableOpacity
					onPress={setLightTheme}
					activeOpacity={0.8}
					style={{
						width: 150,
						height: 50,
						borderRadius: 20,
						backgroundColor: colors.primary,
						justifyContent: 'center'
					}}
				>
					<Text
						style={{
							color: 'white',
							textAlign: 'center',
							fontSize: 22
						}}
					>
						Light
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={setDarkTheme}
					activeOpacity={0.8}
					style={{
						width: 150,
						height: 50,
						borderRadius: 20,
						backgroundColor: colors.primary,
						justifyContent: 'center'
					}}
				>
					<Text
						style={{
							color: 'white',
							textAlign: 'center',
							fontSize: 22
						}}
					>
						Dark
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
