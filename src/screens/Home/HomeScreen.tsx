import React, {useContext} from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {CategoryCard} from '../../components/CategoryCard';
import {PackubaName} from '../../components/PackubaName';
import {ShopContext} from '../../context/shop/ShopContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';
import {homeStyles} from '../../styles/homeTheme';
import {useNavigation} from '@react-navigation/core';

export const HomeScreen = () => {
	const navigation = useNavigation();
	const {top} = useSafeAreaInsets();
	const {car} = useContext(ShopContext);
	console.log('Carrito', car);

	const {
		theme: {colors}
	} = useContext(ThemeContext);

	const {categoryList, loadCategories} = useCategoryPaginated();
	return (
		<>
			<Image
				source={require('../../assets/PackubaLogoWhite.png')}
				style={homeStyles.imageBG}
			/>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() =>
					navigation.navigate('ShopScreen', {
						color: '#F15911'
					})
				}
				style={{position: 'absolute', right: 25, top: 45, zIndex: 9999999999}}
			>
				<Icon color="#0f0d0d" name="cart-outline" size={40} />
			</TouchableOpacity>

			<View style={{alignItems: 'center'}}>
				<FlatList
					data={categoryList}
					keyExtractor={(category, index) => index.toString()}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					// Header
					ListHeaderComponent={
						<View
							style={{
								...homeStyles.globalMargin,
								top: top + 20,
								marginBottom: top + 20,
								paddingBottom: 10
							}}
						>
							<PackubaName />
							{/* <Text
							style={{
								...homeStyles.title,
								...homeStyles.globalMargin,
								top: top + 20,
								marginBottom: top + 20,
								paddingBottom: 10,
								color: colors.text
							}}
						>
							Packuba
						</Text> */}
						</View>
					}
					renderItem={({item}) => <CategoryCard category={item} />}
					// infinite scroll
					/* onEndReached={loadCategories}
					onEndReachedThreshold={0.4}
					 */
					ListFooterComponent={
						<View style={{height: 30}} />
						/* <ActivityIndicator style={{height: 100}} size={20} color="grey" /> */
					}
				/>
			</View>
		</>
	);
};
