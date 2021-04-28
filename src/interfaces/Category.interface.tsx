// Generated by https://quicktype.io

export interface CategoriesPaginated {
	count: number;
	page: number;
	totalPages: number;
	data: Category[];
}

export interface Category {
	name: string;
	image: Image;
	id: string;
}

export interface Image {
	url: string;
	id: string;
}