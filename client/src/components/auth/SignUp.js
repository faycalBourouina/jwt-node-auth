import React, { Component } from 'react';
import { compose } from 'redux'; 
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { Field, reduxForm} from 'redux-form';

class SignUp extends Component {


	submitHelper = (formProps) => {
		this.props.signUp(formProps, () => this.props.history.push('/features'));
	}
	
	render () {
		const { handleSubmit } = this.props;
		return (
				<form onSubmit={handleSubmit(this.submitHelper)}>
					<fieldset>
						<label> Email </label>
						<Field
							name="email"
							type="text"
							component="input"
							autoComplete="none" 
						/> 
					</fieldset>
					<fieldset>
						<label> Password </label>
						<Field
							name="password"
							type="password"
							component="input"
							autoComplete="none" 
						/> 
					</fieldset>
					<button>Signup</button>
					{ this.props.errMsg && <div> { this.props.errMsg } </div> }
				</form>
			)
	}
}

function mapStateToProps(state) {
	return { errMsg: state.auth.errMsg }
} 

export default compose(
  reduxForm({ form: 'signup' }),
  connect(mapStateToProps, actions)
)(SignUp);