import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackParams} from '../../navigation/HomeStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../../components/FadeInImage'; /* 
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails'; */
import {BackButton} from '../../components/BackButton';
import {useCategory} from '../../hooks/useCategory';
import {SubcategoriesList} from '../../components/SubcategoriesList';

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

	const {isLoading, subcategories} = useCategory(id);

	return (
		<>
			{/* Backbutton */}
			<BackButton {...props} />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{flex: 1}}
			>
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

					{isLoading ? (
						<View style={styles.loadingIndicator}>
							<ActivityIndicator color={color} size={50} />
						</View>
					) : (
						<SubcategoriesList subcategories={subcategories} />
					)}
				</ScrollView>
			</KeyboardAvoidingView>
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
