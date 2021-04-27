import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const PackubaName = () => {
	return (
		<View style={styles.cardContainer}>
			<Text style={{...styles.text, color: '#0059FF'}}>PA</Text>
			<Text style={{...styles.text, color: '#FF3100'}}>C</Text>
			<Text style={{...styles.text, color: '#0059FF'}}>K</Text>
			<Text style={{...styles.text, color: '#FF3100'}}>UBA</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: 'row'
	},
	text: {
		fontSize: 36,
		fontWeight: '800'
	}
});
