import { combineReducers } from 'redux'; 
import auth from './auth';
import{ reducer as form } from 'redux-form'

const rootReducer = combineReducers({ 
	auth, 
	form
})

export default rootReducer;