import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
console.log(height, width);

export const homeStyles = StyleSheet.create({
	globalMargin: {
		marginHorizontal: 20
	},
	imageBG: {
		position: 'absolute',
		width: 350,
		height: 350,
		top: height / 2 - 100,
		right: width / 2 - 175,
		opacity: 0.2
	},
	title: {
		fontSize: 35,
		fontWeight: 'bold'
	}
});
