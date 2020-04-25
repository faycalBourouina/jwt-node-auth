import axios from 'axios';
import { AUTH_USER } from './types';
import { AUTH_ERR } from './types'

export const signUp = (propsForm, cb) => async dispatch => {
		try {
			const response = await axios.post('http://localhost:9000/signup', propsForm)
			dispatch({ type: AUTH_USER, payload: response.data.token });
			localStorage.setItem('token', response.data.token);
			cb();
		} catch (e) {
			dispatch({ type: AUTH_ERR, payload: e.response.data.error });
		}

	}



export const signOut = () => {
	return {
		payload: localStorage.removeItem('token'),
		type: AUTH_USER 
	}
}

