import React, {Component} from 'react';

export default class HomePage extends Component {

	setVar() {
		Session.set('Meteor.loginButtons.dropdownVisible', true);
	}

	render() {
		return(
			<div>
				<h1>Home Page</h1>
				<p>blaaaaaaaaaaaaaa</p>
			</div>
			)
	}
}
