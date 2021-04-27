import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native';

import ImageColors from 'react-native-image-colors';
import {ThemeContext} from '../context/theme/ThemeContext';

import {Category} from '../interfaces/Category.interface';
import {FadeInImage} from './FadeInImage';

const windowWidth = Dimensions.get('window').width;

interface Props {
	category: Category;
}

export const CategoryCard = ({category}: Props) => {
	const [bgColor, setBgColor] = useState('#F15911');
	const isMounted = useRef(true);
	const navigation = useNavigation();
	const {
		theme: {colors}
	} = useContext(ThemeContext);

	/* useEffect(() => {
		ImageColors.getColors(category.image.url, {fallback: 'grey'}).then(
			(colors: any) => {
				if (!isMounted.current) return;

				colors.platform === 'android'
					? setBgColor(colors.dominant || 'grey')
					: setBgColor(colors.background || 'grey');
			}
		);
 
		return () => {
			isMounted.current = false;
		};
	}, [category]);
*/
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={() =>
				navigation.navigate('CategoryScreen', {
					category: category,
					color: bgColor
				})
			}
		>
			<View
				style={{
					...styles.cardContainer
					/* justifyContent: 'flex-end', */
					/* width: windowWidth * 0.6, */
					/* backgroundColor: 'red' */
				}}
			>
				{/* Nombre del pokemon y ID */}
				{/* <View>
					<Text style={styles.name}>
						{category.name}
						{'\n#' + category.id}
					</Text>
				</View>
 */}
				{/*  <View style={ styles.pokebolaContainer }>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View> */}

				<FadeInImage uri={category.image.url} style={styles.pokemonImage} />
				<Text style={{...styles.name, color: colors.text}}>
					{category.name}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		marginHorizontal: 20,
		/* backgroundColor: 'red', */
		height: 160,
		width: 160,
		marginBottom: 60,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		top: 4,
		left: 10
	},
	pokebola: {
		width: 100,
		height: 100,
		position: 'absolute',
		right: -25,
		bottom: -25
	},
	pokemonImage: {
		width: 160,
		height: 160,
		borderRadius: 10

		/* 
		position: 'absolute',
		right: -8,
		bottom: -5 */
	},
	pokebolaContainer: {
		width: 100,
		height: 100,
		position: 'absolute',
		bottom: 0,
		right: 0,
		overflow: 'hidden',
		opacity: 0.5
	}
});
