import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
	BottomTabBar,
	createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SettingsStack} from './SettingsStack';
import {HomeStack} from './HomeStack';
import {ThemeContext} from '../context/theme/ThemeContext';
import {Platform} from 'react-native';
import {ShopStack} from './ShopStack';
import {IS_IPHONE_X} from '../utils/isIphone';
import {TabBarAdvancedButton} from '../components/TabBarAdvancedButton';

const Tab = createBottomTabNavigator();

export const TabsNavigation = () => {
	const {
		theme: {colors},
		theme
	} = useContext(ThemeContext);
	return (
		<Tab.Navigator
			initialRouteName="home"
			tabBar={(props) => (
				<View style={styles.navigatorContainer}>
					<BottomTabBar {...props} />
					{IS_IPHONE_X && (
						<View
							style={[
								styles.xFillLine,
								{
									backgroundColor: 'rgba(255,255,255,0.92)'
								}
							]}
						/>
					)}
				</View>
			)}
			/* tabBarOptions={{
				
				keyboardHidesTabBar: true,
				inactiveTintColor: 'gray',
				activeTintColor: colors.primary,
			
				style: {
					position: 'absolute',
					backgroundColor: theme.tabColor,
					borderWidth: 0,
					elevation: 0,
					height: Platform.OS === 'ios' ? 50 : 60
				}
			}} */

			tabBarOptions={{
				keyboardHidesTabBar: true,
				inactiveTintColor: 'gray',
				style: styles.navigator,
				labelStyle: {
					marginBottom: Platform.OS === 'ios' ? 5 : 5
				},
				tabStyle: {
					backgroundColor: 'rgba(255,255,255,0.92)'
				},
				activeTintColor: colors.card
			}}
		>
			<Tab.Screen
				name="home"
				component={HomeStack}
				options={{
					title: 'Tienda',
					tabBarIcon: ({color}) => <Icon name="store" size={22} color={color} />
				}}
			/>
			<Tab.Screen
				name="shop"
				/* options={{title: 'Mi Compra'}} */
				options={{
					tabBarButton: (props) => (
						<TabBarAdvancedButton bgColor={'#F6F7EB'} {...props} />
					)
				}}
				component={ShopStack}
			/>
			<Tab.Screen
				name="settings"
				component={SettingsStack}
				options={{
					title: 'Contáctanos',
					tabBarIcon: ({color}) => (
						<Icon name="phone-square-alt" size={24} color={color} />
					)
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	navigatorContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22
	},
	navigator: {
		borderTopWidth: 0,
		backgroundColor: 'transparent',
		elevation: 30
	},
	xFillLine: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 34
	}
});
