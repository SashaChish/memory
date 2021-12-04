import { $api } from '../http';

export const registration = (userData) => {
	return $api.post('/users', userData);
};
