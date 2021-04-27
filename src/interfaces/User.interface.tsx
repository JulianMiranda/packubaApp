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
	email: string;
	id: string;
	image: Image;
}
export interface Image {
	url: string;
	id: string;
}
