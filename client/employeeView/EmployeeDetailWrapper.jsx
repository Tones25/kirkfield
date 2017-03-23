import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Employees} from './EmployeeInputWrapper';
import EmployeeDetail from './EmployeeDetail';
import LoginForm from '../LoginForm.jsx';



export default class EmployeeDetailWrapper extends TrackerReact(Component) {

	constructor() {
		super();

		this.state = {
			subscription: {
				employees: Meteor.subscribe("allEmployees")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.employees.stop();
	}

	employee() {
		return Employees.findOne(this.props.id);
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
		if(!Roles.userIsInRole(Meteor.user(), 'admin')) {
			return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Access Denied</h1>
				</div> 
				
			</div>
				)
		}
		let employee = this.employee();

		if(!employee) {
			return(<div>Loading...</div>)
		}
		return(
			<div className="row">			
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Employee Id {employee.employeeId}</h1>
				</div>
				<div className="panel-body">
					<EmployeeDetail  id={this.props.id}/>
				</div>
			</div>
			</div>
			)
	}
}
