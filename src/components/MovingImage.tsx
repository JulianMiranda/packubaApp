import React, {useState} from 'react';
import {
	ActivityIndicator,
	Animated,
	ImageErrorEventData,
	ImageStyle,
	NativeSyntheticEvent,
	StyleProp,
	TouchableOpacity
} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';
import {ModalComponent} from './Modal';

interface Props {
	uri: string;
	style?: StyleProp<ImageStyle>;
}

export const MovingImage = ({uri, style = {}}: Props) => {
	const {opacity, fadeIn, startMovingPosition} = useAnimation();
	const [isLoading, setIsLoading] = useState(true);
	const [isVisible, setIsVisible] = useState(false);

	const finishLoading = () => {
		setIsLoading(false);
		fadeIn();
	};

	const pressImage = () => {
		setIsVisible(true);
		//startMovingPosition(100);
	};

	const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
		setIsLoading(false);
	};

	return (
		<>
			<TouchableOpacity
				onPress={pressImage}
				activeOpacity={0.8}
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					...(style as any)
				}}
			>
				{isLoading && (
					<ActivityIndicator
						style={{position: 'absolute'}}
						color="grey"
						size={30}
					/>
				)}

				<Animated.Image
					source={{uri}}
					onError={onError}
					onLoad={finishLoading}
					style={{
						...(style as any),
						opacity
					}}
				/>
			</TouchableOpacity>
			<ModalComponent
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				imageUri={uri}
			/>
		</>
	);
};
