import React, {Component} from 'react';
import { Match, check } from 'meteor/check';

export default class LoginForm extends Component {

	login(event) {
		event.preventDefault();
		let username = this.refs.user.value.trim();
		let passwd = this.refs.pass.value.trim();
		//add further input validation rules here
		if(username) {
			console.log(username);
			Meteor.loginWithPassword(username, passwd, (error, data) => {
				if (error) {
					Bert.alert('Invalid Credentials', 'danger', 'fixed-top', 'fa-frown-o');
				}
			});
			}
		}

	
	render() {
		return(
			<form className="form-horizontal" onSubmit={this.login.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="contactName">Username:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="contactName"
						type="text" 
						ref="user"
						placeholder="Username"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="address">Password:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="address"
						type="password" 
						ref="pass"
						placeholder="Password"
					/>
					</div>
					</div>
					
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)			
	}
}
