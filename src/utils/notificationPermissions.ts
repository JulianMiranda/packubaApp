import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const askNotificationPermissions = async () => {
	const {status: existingStatus} = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;

	if (existingStatus !== 'granted') {
		const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	}
	if (finalStatus !== 'granted') {
		return false;
	}
	return true;
};

const registerForPushNotifications = async () => {
	console.log('Pidendo per');

	const enabled = await askNotificationPermissions();
	if (!enabled) {
		return Promise.resolve();
	}
	let token = await Notifications.getExpoPushTokenAsync();
	console.log('User Push Token - ', token.data);
	return token.data;
};

export {registerForPushNotifications};
