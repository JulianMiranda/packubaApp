import React from 'react';
import {
	Button,
	Modal,
	Image,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';

interface Props {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	imageUri: string;
}
export const ModalComponent = ({isVisible, setIsVisible, imageUri}: Props) => {
	return (
		<Modal
			animationType="fade"
			visible={isVisible}
			transparent={true}
			onRequestClose={() => setIsVisible(false)}
		>
			{/* Background negro */}
			<TouchableOpacity
				style={{
					flex: 1,
					backgroundColor: 'rgba(0,0,0,0.3)',
					justifyContent: 'center',
					alignItems: 'center'
				}}
				activeOpacity={1}
				onPressOut={() => setIsVisible(false)}
			>
				{/* Contenido del modal */}
				<TouchableWithoutFeedback
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
				</TouchableWithoutFeedback>
			</TouchableOpacity>
		</Modal>
	);
};
