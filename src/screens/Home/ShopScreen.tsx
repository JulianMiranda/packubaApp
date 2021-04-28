import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {RootStackParams} from '../../navigation/HomeStack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParams, 'ShopScreen'> {}

export const ShopScreen = (props: Props) => {
	const {navigation, route} = props;
	const {color} = route.params;
	const {top} = useSafeAreaInsets();
	return (
		<>
			{/* Backbutton */}
			<BackButton {...props} />
			<ScrollView style={{flex: 1}}>
				{/* Heade Containerr */}
				<View
					style={{
						...styles.headerContainer,
						backgroundColor: color
					}}
				>
					<Text
						style={{
							...styles.pokemonName,
							top: top + 50
						}}
					>
						Mis Compras
					</Text>
				</View>

				{/* Detalles y Loading */}
				<Text style={{marginTop: 30, marginLeft: 10}}>Cosas</Text>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		height: 170,
		zIndex: 999,
		alignItems: 'center',
		borderBottomRightRadius: 1000,
		borderBottomLeftRadius: 0
	},
	backButton: {
		position: 'absolute',
		zIndex: 999999999,
		left: 20
	},
	pokemonName: {
		color: 'white',
		fontSize: 40,
		alignSelf: 'flex-start',
		left: 20
	},
	pokeball: {
		width: 250,
		height: 250,
		bottom: -20,
		opacity: 0.7
	},
	pokemonImage: {
		borderRadius: 90,
		width: 250,
		height: 250,
		position: 'absolute',
		bottom: -15
	},
	loadingIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
