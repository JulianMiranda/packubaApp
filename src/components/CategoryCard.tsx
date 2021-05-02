import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import {ThemeContext} from '../context/theme/ThemeContext';

import {Category} from '../interfaces/Category.interface';
import {FadeInImage} from './FadeInImage';

interface Props {
	category: Category;
}

export const CategoryCard = ({category}: Props) => {
	const {
		theme: {colors}
	} = useContext(ThemeContext);

	const navigation = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={() =>
				navigation.navigate('CategoryScreen', {
					category: category,
					color: colors.primary
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
				<FadeInImage uri={category.image.url} style={styles.productImage} />
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
	productImage: {
		width: 160,
		height: 160,
		borderRadius: 10
	}
});
