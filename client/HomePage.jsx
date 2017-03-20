import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoginForm from './LoginForm.jsx';

export default class HomePage extends TrackerReact(React.Component) {
	constructor() {
		super();

	}

	loginUser(event) {
		event.preventDevault();
		let username = this.refs.username.value.trim();
		let password = this.refs.password.value.trim();
		console.log(username);
		//Meteor.loginWithPassword(this.refs.user.value, this.refs.pass.value);
	}

	//setVar() {
	//	Session.set('Meteor.loginButtons.dropdownVisible', true);
	//}

	inv(route) {
		FlowRouter.go('/inventoryInput');
	}

	job(route) {
		FlowRouter.go('/jobInput');
	}

	veh(route) {
		FlowRouter.go('/vehicleInput');
	}

	emp(route) {
		FlowRouter.go('/employees');
	}

	rep(route) {
		FlowRouter.go('/reporting');
	}

	render() {
		if(!Meteor.userId()) {
			return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Please Log In</h1>
				</div> 
				<div className="panel-body">
					<LoginForm/>
				</div>
			</div>
				)
		}

		return(
		<div className="row">

			<div className="col-sm-6">
				<button onClick={this.inv.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-shopping-cart"></span> Inventory
				</button>
			</div>
			<div className="col-sm-6">
				<button onClick={this.job.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-briefcase"></span> Jobs
				</button>
			</div>
			
			<div className="col-sm-6">
				<button onClick={this.veh.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-road"></span> Vehicles
				</button>
			</div>
			<div className="col-sm-6">
				<button onClick={this.emp.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-user"></span> Employees
				</button>
			</div>
			
			<div className="col-sm-12">
				<button onClick={this.rep.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-th-list"></span> Reports 
				</button>
			</div>

		</div>
		)
	}
}
