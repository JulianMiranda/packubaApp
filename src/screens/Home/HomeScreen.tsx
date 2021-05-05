import React, {useContext} from 'react';
import {View, Text, Image, FlatList, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CategoryCard} from '../../components/CategoryCard';
import {PackubaName} from '../../components/PackubaName';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';
import {homeStyles} from '../../styles/homeTheme';
import {ShopIcon} from '../../components/ShopIcon';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen = (props: Props) => {
	const {top} = useSafeAreaInsets();

	const {
		theme: {colors}
	} = useContext(ThemeContext);

	const {categoryList, loadCategories} = useCategoryPaginated();
	return (
		<>
			<Image
				source={require('../../assets/LOGO1.png')}
				style={homeStyles.imageBG}
			/>
			{/* <ShopIcon {...props} /> */}

			<View
				style={{
					...homeStyles.globalMargin,
					position: 'absolute',
					zIndex: 9999999,
					width: '100%',
					alignItems: 'flex-start',

					backgroundColor: 'rgba(255,255,255,0.92)',
					borderBottomRightRadius: Platform.OS === 'ios' ? 5000 : 2000,
					borderBottomLeftRadius: 0

					/* top: top, */
				}}
			>
				<PackubaName />
			</View>

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
								marginBottom: top + 80,
								paddingBottom: 10
							}}
						>
							{/* <PackubaName /> */}
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
