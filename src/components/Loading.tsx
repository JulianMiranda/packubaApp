import React from 'react';
import {View, Image} from 'react-native';

export const Loading = () => {
	return (
		<View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
			<Image
				source={require('../assets/points.gif')}
				style={{height: 120, width: 120, alignSelf: 'center'}}
			/>
			{/* <ActivityIndicator /> */}
		</View>
	);
};
