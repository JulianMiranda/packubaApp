import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';

export const PackubaName = () => {
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<View style={styles.mainContainer}>
			<View style={styles.cardContainer}>
				<Text style={{...styles.text, color: colors.card}}>PA</Text>
				<Text style={{...styles.text, color: colors.primary}}>C</Text>
				<Text style={{...styles.text, color: colors.card}}>K</Text>
				<Text style={{...styles.text, color: colors.primary}}>UBA</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		marginTop: 30,
		alignItems: 'center',
		alignContent: 'center'
	},
	cardContainer: {
		flexDirection: 'row'
	},
	text: {
		fontSize: 45,
		fontWeight: '800'
	}
});
