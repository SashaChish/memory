import { SET_USER, SET_AVATAR } from '../actionTypes';

const initState = {
	_id: '',
	fullName: '',
	username: '',
	email: '',
	avatar: '',
	posts: [],
	followers: [],
	following: [],
	saved: [],
};

export const userReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, ...action.payload };
		case SET_AVATAR:
			return { ...state, avatar: action.payload.link };
		default:
			return state;
	}
};
