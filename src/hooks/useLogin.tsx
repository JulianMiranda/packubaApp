import {useState, useEffect} from 'react';
import api from '../api/api';
import {
	SubcategoryResp,
	Subcategory
} from '../interfaces/Subcategory.interface';

export const useLogin = () => {
	const [isLoading, setIsLoading] = useState(true);

	const [state, setState] = useState();

	const onChange = () => {};

	return {
		form: state,
		onChange
	};

	return {
		isLoading
	};
};
