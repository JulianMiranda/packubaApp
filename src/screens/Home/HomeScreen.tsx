import React, {useContext} from 'react';
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CategoryCard} from '../../components/CategoryCard';
import {PackubaName} from '../../components/PackubaName';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';
import {homeStyles} from '../../styles/homeTheme';

export const HomeScreen = () => {
	const {top} = useSafeAreaInsets();
	const {user, logOut} = useContext(AuthContext);
	const {
		theme: {colors}
	} = useContext(ThemeContext);

	const {categoryList, loadCategories} = useCategoryPaginated();
	return (
		<>
			<Image
				source={require('../../assets/PackubaLogoWhite.png')}
				style={homeStyles.pokebolaBG}
			/>

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
