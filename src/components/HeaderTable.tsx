import React from 'react';
import {View, Text} from 'react-native';
interface Props {
	editHeader: string;
}
export const HeaderTable = ({editHeader}: Props) => {
	return (
		<>
			<View style={{flexDirection: 'row', marginBottom: 5}}>
				<View style={{flex: 4}}>
					<Text style={{textAlign: 'left'}}>Producto</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{textAlign: 'center', marginLeft: 10}}>Precio</Text>
				</View>
				<View style={{flex: 2, marginLeft: 5}}>
					<Text style={{textAlign: 'center'}}>Cantidad</Text>
				</View>
				<View style={{flex: 2}}>
					<Text style={{textAlign: 'center'}}>{editHeader}</Text>
				</View>
			</View>
		</>
	);
};
