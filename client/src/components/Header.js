import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Header extends Component {
	
	renderHelper() {
		if (this.props.auth) {
			return (
					<div>
						<Link to='/features'> Features </Link>
						<Link to='/auth/signout'> Sign Out </Link>
					</div>
				)
			}

			return (
					<div>
						<Link to='/signin'> Sign in </Link>
						<Link to='/auth/signup'> Sign up </Link>
					</div>
				)

	}

	render() {		
		return (
				<div>
					{ this.renderHelper() }
					<Link to='/'> Auth redux </Link>
				</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth.authenticated
	}
}

export default connect(mapStateToProps, null)(Header);