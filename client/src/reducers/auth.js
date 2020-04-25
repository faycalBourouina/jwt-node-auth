import { AUTH_USER } from '../actions/types';
import { AUTH_ERR } from '../actions/types';

const INIT_STATE = {
	authenticated: localStorage.getItem('token'),
	errMsg: ''
}

export default (state= INIT_STATE, actions) => {
	switch (actions.type) {
		case AUTH_USER:
			return { ...state, authenticated: actions.payload };
		case AUTH_ERR:
			return { ...state, errMsg: actions.payload };
		default: 
			return state;
	}
}