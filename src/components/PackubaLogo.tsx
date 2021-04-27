import React from 'react';
import {Image, View} from 'react-native';

export const PackubaLogo = () => {
	return (
		<View
			style={{
				alignItems: 'center'
			}}
		>
			<Image
				source={require('../assets/LogoPackuba.png')}
				style={{
					width: 200,
					height: 110
				}}
			/>
		</View>
	);
};
