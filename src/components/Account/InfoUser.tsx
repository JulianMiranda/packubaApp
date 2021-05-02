import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-easy-toast';
import {AuthContext} from '../../context/auth/AuthContext';

interface Props {
	toastRef: any;
}

export default function InfoUser(props: Props) {
	const {user} = useContext(AuthContext);
	const {image, email, id, name} = user!;
	const {toastRef} = props;

	const changeAvatar = async () => {
		const resultPermission = await Permissions.askAsync(
			Permissions.MEDIA_LIBRARY
		);
		const resultPermissionCamera =
			resultPermission.permissions.cameraRoll.status;

		if (resultPermissionCamera === 'denied') {
			toastRef.current.show('Es necesario aceptar los permisos de la galería');
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4, 3]
			});

			if (result.cancelled) {
				toastRef.current.show('Has cerrado la selección de imágenes');
			} else {
				uploadImage(result.uri)
					.then(() => {
						updatePhotoUrl();
					})
					.catch(() => {
						toastRef.current.show('Error al actualizar el avatar.');
					});
			}
		}
	};

	const uploadImage = async (uri: string) => {
		/* 	setLoading(true); */

		const response = await fetch(uri);
		const blob = await response.blob();

		const ref = firebase.storage().ref().child(`avatar/${id}`);
		return ref.put(blob);
	};

	const updatePhotoUrl = () => {
		firebase
			.storage()
			.ref(`avatar/${id}`)
			.getDownloadURL()
			.then(async (response) => {
				const update = {
					photoURL: response
				};
				await firebase.auth().currentUser?.updateProfile(update);
				/* setLoading(false); */
			})
			.catch(() => {
				toastRef.current.show('Error al actualizar el avatar.');
			});
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				backgroundColor: 'white',
				paddingTop: 15,
				paddingBottom: 15,
				marginLeft: 20
			}}
		>
			<Image
				source={{uri: image.url}}
				style={{height: 70, width: 70, borderRadius: 100}}
			/>
			{/* <Avatar
				rounded
				size="xlarge"
				style={{height: 100, width: 100}}
				onEditPress={changeAvatar}
				source={
					photoURL
						? {uri: photoURL}
						: require('../../../assets/avatar-default.jpg')
				}
			></Avatar> */}
			<View
				style={{
					flexDirection: 'column',
					marginLeft: 15,
					justifyContent: 'center'
				}}
			>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 20,
						paddingBottom: 5
					}}
				>
					{name ? name : 'Anónimo'}
				</Text>
				<Text>{email ? email : 'Social Login'}</Text>
			</View>
		</View>
	);
}
