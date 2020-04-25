import React, { Component } from 'react'; 
import { connect } from 'react-redux';

 export default (ChildComponent) => {
 	class ComposedComponent extends Component {
 		
 		shouldNavigateAway(){
			if (!this.props.auth) {
				return this.props.history.push('/');
			} 	
 		}

 		componentDidMount () {
 			this.shouldNavigateAway();
 		}

 		render () {
 			return <ChildComponent/>  
 		}

 	}

 	function mapStateToProps(state) {
	return { auth: state.auth.authenticated } 
	} 

	
	return connect(mapStateToProps,null)(ComposedComponent)
 

 }  


