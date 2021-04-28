import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackParams} from '../../navigation/HomeStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../../components/FadeInImage'; /* 
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails'; */
import {BackButton} from '../../components/BackButton';

interface Props extends StackScreenProps<RootStackParams, 'CategoryScreen'> {}

export const CategoryScreen = (props: Props) => {
	const {navigation, route} = props;
	const {category, color} = route.params;
	const {
		id,
		name,
		image: {url}
	} = category;
	const {top} = useSafeAreaInsets();
	/* 
    const { isLoading, pokemon } = usePokemon( id ); */

	return (
		<>
			{/* Backbutton */}
			<BackButton {...props} />
			{/* <TouchableOpacity
				onPress={() => navigation.pop()}
				activeOpacity={0.8}
				style={{
					...styles.backButton,
					top: top + 5
				}}
			>
				<Icon name="arrow-back-outline" color="white" size={35} />
			</TouchableOpacity> */}
			<ScrollView style={{flex: 1}}>
				{/* Heade Containerr */}
				<View
					style={{
						...styles.headerContainer,
						backgroundColor: color
					}}
				>
					{/* Nombre del Pokemon */}
					<Text
						style={{
							...styles.pokemonName,
							top: top + 50
						}}
					>
						{name + '\n'}
					</Text>

					{/* Pokebola blanca */}
					{/*  <Image
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokeball }
                /> */}

					<FadeInImage uri={url} style={styles.pokemonImage} />
				</View>

				{/* Detalles y Loading */}
				<Text style={{marginTop: 30, marginLeft: 10}}>
					La llegada de Julian Nagelsmann al Bayern de Múnich supone el comienzo
					de una nueva era en el Allianz Arena. Dotando al entrenador de 33
					años, el más joven en Múnich desde Sören Lerby en 1991, con un
					contrato hasta 2026, el todocampeón deja claro que confía en el míster
					de moda de Alemania a la hora de sentar las bases del Bayern del
					futuro. Lo que más apasionante se antoja, a priori, es saber si
					revolucionará el esquema táctico de un equipo que, sobre todo gracias
					a la labor de Hansi Flick a lo largo de las últimas dos temporadas, ya
					cuenta con un estilo muy marcado que lo llevó a conquistar el sextete.
				</Text>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		height: 370,
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
