export interface LoginState {
	phoneNumber: string | null;
	code: string | null;
}

type LoginAction =
	| {type: 'setPhoneNumber'; payload: {phoneNumber: string}}
	| {type: 'setCode'; payload: {code: string}};

export const loginReducer = (
	state: LoginState,
	action: LoginAction
): LoginState => {
	switch (action.type) {
		case 'setPhoneNumber':
			return {
				...state,
				phoneNumber: action.payload.phoneNumber
			};

		case 'setCode':
			return {
				...state,
				code: action.payload.code
			};

		default:
			return state;
	}
};
