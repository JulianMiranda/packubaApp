import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const Loading = () => {
	return (
		<View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
			<ActivityIndicator />
		</View>
	);
};
