import {Image} from './Image.interface';

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
	name: string;
}

export interface User {
	role: string;
	name: string;
	email?: string;
	phone?: string;
	authorized?: boolean;
	id: string;
	theme: string;
	image: Image;
}
