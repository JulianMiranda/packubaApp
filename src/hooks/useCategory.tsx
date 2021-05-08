import {useState, useEffect} from 'react';
import api from '../api/api';
import {
	SubcategoryResp,
	Subcategory
} from '../interfaces/Subcategory.interface';

export const useCategory = (id: string) => {
	const [isLoading, setIsLoading] = useState(true);
	const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

	const loadSubcategories = async () => {
		const body = {
			filter: {category: ['=', id]},
			population: [
				{
					path: 'category',
					filter: {status: true},
					fields: {
						name: true
					}
				},
				{
					path: 'images',
					filter: {status: true},
					fields: {
						url: true
					}
				}
			]
		};
		const resp = await api.post<SubcategoryResp>(
			'/subcategories/getList',
			body
		);
		setSubcategories(resp.data.data);
		setIsLoading(false);
	};

	useEffect(() => {
		loadSubcategories();
	}, []);

	return {
		isLoading,
		subcategories
	};
};
