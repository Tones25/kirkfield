import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import DataTable from './../DataTable.jsx';


export default class AdminWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				users: Meteor.subscribe("allUsers"),
			},
		};
	}

	componentWillUnmount() {
		this.state.subscription.users.stop();
	}

	addUser(event) {
		event.preventDefault();
		let username = this.refs.username.value.trim();
		let password = this.refs.password.value.trim();

		
		if(username && password) {
			Meteor.call('addUser', username, password, (error, data) => {
			if(error) {
				Bert.alert('Username already in use', 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			this.refs.username.value = "";
			this.refs.password.value = "";
			}
		});
		}
	}

	users() {
		return Meteor.users.find().fetch();
	}


	render() {
		
		return(
			<div className="row">
				<div className="panel panel-primary">
					<div className="panel panel-heading">
						<ReactCSSTransitionGroup
							transitionName="panelHeading"
							transitionEnterTimeout={500}
							transitionLeaveTimeout={500}
							transitionAppear={true}
							transitionAppearTimeout={750}>
							<h1>Add New User</h1>
						</ReactCSSTransitionGroup>
					</div>
					<div className="panel-body">
						<form className="form-horizontal" onSubmit={this.addUser.bind(this)}>
							<div className="form-group">
								<label className="control-label col-sm-2" htmlFor="invoiceNumber">User Name:</label>
								<div className="col-sm-10">
								<input 
									type="text" 
									className="form-control"
									id="username"
									ref="username"
									placeholder="User Name"
								/>
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-2" htmlFor="invoiceNumber">Password:</label>
								<div className="col-sm-10">
								<input 
									type="text" 
									className="form-control"
									id="password"
									ref="password"
									placeholder="Password"
								/>
								</div>
							</div>
							<input type="submit" className="btn btn-primary pull-right"/>
					</form>
					<ul className="resolutions">
						{this.users().map( (users) => {
							return <h1 key={users._id}> username = {users.username} role ={users.roles} </h1>
						})}
					</ul>
					</div>
				</div>
			</div>
			)
	}
}

