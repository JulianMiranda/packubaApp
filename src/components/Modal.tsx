import React from 'react';
import {Button, Modal, Image, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	imageUri: string;
}
export const ModalComponent = ({isVisible, setIsVisible, imageUri}: Props) => {
	return (
		<Modal animationType="fade" visible={isVisible} transparent={true}>
			{/* Background negro */}
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(0,0,0,0.3)',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{/* Contenido del modal */}
				<View
					style={{
						width: 300,
						height: 300,
						justifyContent: 'center',
						alignItems: 'center',
						shadowOffset: {
							width: 0,
							height: 10
						},
						shadowOpacity: 0.25,
						elevation: 10,
						borderRadius: 10
					}}
				>
					<Image
						style={{width: 300, height: 300, borderRadius: 10}}
						source={{uri: imageUri}}
					/>
					<TouchableOpacity
						onPress={() => setIsVisible(false)}
						activeOpacity={0.8}
						style={{position: 'absolute', right: 5, top: 5}}
					>
						<Icon name="times-circle" size={22} />
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};
