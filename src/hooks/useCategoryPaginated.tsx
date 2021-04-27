import {useEffect, useRef, useState} from 'react';
import api from '../api/api';

import {CategoriesPaginated, Category} from '../interfaces/Category.interface';

export const useCategoryPaginated = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [categoryList, setCategoryList] = useState<Category[]>([]);

	const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

	const loadCategories = async () => {
		setIsLoading(true);
		const body = {
			population: [
				{
					path: 'image',
					fields: {
						url: true
					}
				}
			]
		};
		const resp = await api.post<CategoriesPaginated>(
			'/categories/getList',
			body
		);

		setCategoryList([...categoryList, ...resp.data.data]);
		setIsLoading(false);
	};

	useEffect(() => {
		loadCategories();
	}, []);

	return {
		isLoading,
		categoryList,
		loadCategories
	};
};
