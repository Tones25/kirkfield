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

	back() {
		FlowRouter.go("/employees");
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
		let employee = this.employee();

		if(!employee) {
			return(<div>Loading...</div>)
		}
		return(
			<div>			
				<button className="btn btn-primary" onClick={this.back.bind(this)}>
						Back to Employees<span className="glyphicon glyphicon-return"></span>
				</button>
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>{employee.employeeFirstName} {employee.employeeLastName}&emsp;(Employee#{employee.employeeId})</h1>
				</div>
				<div className="panel-body">
					<EmployeeDetail  id={this.props.id}/>
				</div>
			</div>
			</div>
			)
	}
}
