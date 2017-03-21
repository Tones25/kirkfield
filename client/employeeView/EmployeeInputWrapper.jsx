import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import EmployeeForm from './EmployeeForm.jsx';
import EmployeeSingle from './EmployeeSingle.jsx';
import LoginForm from '../LoginForm.jsx';


export const Employees = new Mongo.Collection("employees");

export default class EmployeeInputWrapper extends TrackerReact(React.Component) {
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

	employees() {
		return Employees.find().fetch();
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
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Add Employee</h1>
				</div>
				<div className="panel-body">
					<EmployeeForm />
				</div>
				</div>
				
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>All Employees</h1>
				</div>
				<div className="panel-body">
				
					<div className="panel-group" id="employeeAccordion">
	
					{this.employees().map( (employees) => {
						return <div className="panel panel-default" key={employees._id}>
							<div className="panel-heading">
								<h4 className="panel-title">
									<a 	data-toggle="collapse"
										data-parent="#employeeAccordion" 
										href={"#collapse" + employees._id}>{employees.employeeFirstName}
									</a>
								</h4>
							</div>
							<div id={"collapse" + employees._id} className="panel-collapse collapse">
								<div className="panel-body">
									<EmployeeSingle key={employees._id} employee={employees} />
								</div>
							</div>
						</div>
					})}
					
					</div>
				</div>
				</div>
			</div>
		)
	}
}

