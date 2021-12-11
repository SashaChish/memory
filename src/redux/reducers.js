import { SET_USER } from './actionTypes';

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
			console.log({ ...state, ...action.payload });
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
