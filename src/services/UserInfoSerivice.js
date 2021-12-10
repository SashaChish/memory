import { $api } from '../http/index.js';

export const userInfo = () => {
	return $api.get('/auth');
};
