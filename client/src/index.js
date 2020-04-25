import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Route} from 'react-router-dom';

import reducers from './reducers';

import App from './components/App';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut';
import Welcome from './components/Welcome';
import Features from './components/features';


//import React & ReactDOM on index 
// select the dom element on index.html to inject the app 
const domContainer = document.querySelector('#root');
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}>
			<BrowserRouter>
				<App>
					<Route exact path="/" component={Welcome} />
					<Route path="/auth/signup" component={SignUp} />
				    <Route path="/auth/signout" component={SignOut} />
                 	<Route path="/features" component={Features} /> 
				</App>
			</BrowserRouter>
	</Provider>
	, domContainer); 