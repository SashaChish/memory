import { SET_USER } from './actionTypes';

const initState = JSON.parse(localStorage.getItem('userinfo')) || {
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
			localStorage.setItem(
				'userinfo',
				JSON.stringify({ ...state, ...action.payload })
			);
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
