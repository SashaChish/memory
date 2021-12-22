import { SET_USER, SET_AVATAR } from '../actionTypes';

export const setUser = (userData) => {
	return {
		type: SET_USER,
		payload: userData,
	};
};

export const setAvatar = (link) => {
	return {
		type: SET_AVATAR,
		payload: { link },
	};
};
