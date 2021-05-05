import React, {useContext} from 'react';
import {View, Text, Image, FlatList, Platform, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CategoryCard} from '../../components/CategoryCard';
import {PackubaName} from '../../components/PackubaName';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useCategoryPaginated} from '../../hooks/useCategoryPaginated';
import {homeStyles} from '../../styles/homeTheme';
import {ShopIcon} from '../../components/ShopIcon';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}
const {width, height} = Dimensions.get('window');
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
					width: width,
					left: 0,
					/* width: '100%', */
					/* alignItems: 'center',
					alignContent: 'center', */

					backgroundColor:
						'rgba(255,255,255,0.92)' /* 
					borderBottomRightRadius: Platform.OS === 'ios' ? 100 : 200,
					borderBottomLeftRadius: Platform.OS === 'ios' ? 40 : 40 */

					/* top: top, */
				}}
			>
				<Image
					source={require('../../assets/LOGO2.png')}
					style={{
						/* position: 'absolute',
						left: width / 2 - 120, */
						alignSelf: 'center',
						marginTop: top + 5,
						height: 37,
						width: 180,
						marginRight: 30,
						marginBottom: 5
					}}
				/>
				{/* <PackubaName /> */}
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
								top: top,
								marginBottom: top + 60,
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
