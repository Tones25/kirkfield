import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class CreateAccountForm extends Component {

	addAdminAccount(event) {
		event.preventDefault();
		let username = this.refs.username.value.trim();
		let password = this.refs.password.value.trim();

		Meteor.call('createAdm', username, password, function(error, result) {
			if(error) {
				throwError(error.reason);
			} else {
				throwError('Admin account created');
			}
		});

		export default class EmployeeInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				employees: Meteor.subscribe("allEmployees")
			}
		}
	}