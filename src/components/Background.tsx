import React, {useContext} from 'react';
import {View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';

export const Background = () => {
	const {
		theme: {colors}
	} = useContext(ThemeContext);
	return (
		<View
			style={{
				position: 'absolute',
				backgroundColor: colors.primary,
				top: -270,
				width: 1000,
				height: 1200,
				transform: [{rotate: '-70deg'}]
			}}
		/>
	);
};
