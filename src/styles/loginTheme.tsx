import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
	title: {
		color: 'black',
		marginBottom: 30,
		fontSize: 18,
		marginRight: 10,
		textAlign: 'justify'
	},

	input: {
		borderBottomColor: 'black',
		borderBottomWidth: 2,
		backgroundColor: '#DBEBFF',
		height: 35,
		fontSize: 22
	},
	codeFieldRoot: {marginTop: 20},
	cell: {
		width: 40,
		height: 40,
		lineHeight: 38,
		fontSize: 24,
		borderWidth: 2,
		borderColor: '#00000030',
		textAlign: 'center'
	},
	focusCell: {
		borderColor: '#000'
	},
	flagInputText: {
		color: 'black',
		fontSize: 25,
		backgroundColor: '#DBEBFF',
		borderBottomColor: 'rgba(0,0,0,0.92)',
		borderBottomWidth: 2,
		height: 30,
		marginRight: 15
	},
	flagStyle: {
		width: 40,
		height: 25,
		borderWidth: 0
	},
	backButton: {position: 'absolute', zIndex: 999999999, left: 20}
});
