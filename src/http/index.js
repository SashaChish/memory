import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

export const $api = axios.create({
	baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
	config.headers['x-auth-token'] = localStorage.getItem('x-auth-token');

	return config;
});
