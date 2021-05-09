import {User} from '../../interfaces/User.interface';

export interface LoginState {
	status: 'input-phone' | 'input-code' | 'input-name';
	errorMessage: string;
	wait: boolean;
	phoneNumber: string;
	verificationCode: string;
	name: string;
}

type LoginAction =
	| {type: 'setInputPhone'}
	| {type: 'setInputCode'}
	| {type: 'setInputName'}
	| {type: 'setPhoneNumber'; payload: string}
	| {type: 'setCode'; payload: string}
	| {type: 'setName'; payload: string}
	| {type: 'addError'; payload: string}
	| {type: 'removeError'}
	| {type: 'logout'}
	| {type: 'initCheck'};

export const loginReducer = (
	state: LoginState,
	action: LoginAction
): LoginState => {
	switch (action.type) {
		case 'setInputPhone':
			return {
				...state,
				status: 'input-phone',
				verificationCode: ''
			};
		case 'setInputCode':
			return {
				...state,
				status: 'input-code',
				verificationCode: ''
			};
		case 'setInputName':
			return {
				...state,
				status: 'input-name',
				verificationCode: ''
			};
		case 'setPhoneNumber':
			return {
				...state,
				phoneNumber: action.payload
			};
		case 'setCode':
			return {
				...state,
				verificationCode: action.payload
			};
		case 'setName':
			return {
				...state,
				name: action.payload
			};
		case 'addError':
			return {
				...state,
				errorMessage: action.payload,
				wait: false
			};

		case 'removeError':
			return {
				...state,
				errorMessage: '',
				wait: false
			};
		case 'initCheck':
			return {
				...state,
				wait: true
			};

		default:
			return state;
	}
};
