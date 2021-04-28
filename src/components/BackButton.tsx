import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<any, any> {}
export const BackButton = ({navigation}: Props) => {
	const {top} = useSafeAreaInsets();
	return (
		<TouchableOpacity
			onPress={() => navigation.pop()}
			activeOpacity={0.8}
			style={{
				...styles.backButton,
				top: top + 5
			}}
		>
			<Icon name="arrow-back-outline" color="white" size={35} />
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	backButton: {
		position: 'absolute',
		zIndex: 999999999,
		left: 20
	}
});
