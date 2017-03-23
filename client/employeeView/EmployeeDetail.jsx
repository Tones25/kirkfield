import React, {Component} from 'react';
import {Employees} from './../employeeView/EmployeeInputWrapper.jsx';

export default class EmployeeDetail extends Component {
	constructor() {
		super();
		this.state = {
			subscription: {
				employees: Meteor.subscribe("allEmployees")
			}
		};
	}

	componentWillUnmount() {
		this.state.subscription.employees.stop();
	}	

	employee() {
		return Employees.findOne(this.props.id);
	}

	date() {
		let employee = this.employee();
		//console.log(employee);
		newDate = new Date(parseInt(employee.employeeStartDate.getFullYear()), parseInt(employee.employeeStartDate.getMonth()), parseInt(employee.employeeStartDate.getDate()));
		return newDate.toISOString().substr(0,10);
	}
	
	back() {
		FlowRouter.go("/employees");
	}
	
	editEmployee(event) {
		event.preventDefault();
		let employeeFirstName = this.refs.employeeFirstName.value.trim();
		let employeeLastName = this.refs.employeeLastName.value.trim();
		let employeeStartDate = this.refs.employeeStartDate.value.trim();
		let employeeExperience = this.refs.employeeExperience.value.trim();
		let employeeHourlyRate = this.refs.employeeHourlyRate.value.trim();
		
		

		Meteor.call('editEmployee', this.employee(), employeeFirstName, 
				employeeLastName, employeeStartDate, employeeExperience, 
				employeeHourlyRate, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
				Bert.alert('Successfully updated Employee#' + this.employee().employeeId + '.', 'success', 'fixed-top', 'fa-smile-o');
			}
		});
	}

	
	
	render() {
		employee = this.employee();
		if (!this.employee()) {
			return (<div>Loading...</div>);
		}
		return(
			<form className="form-horizontal" onSubmit={this.editEmployee.bind(this)}>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="employeeFirstName">First Name:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="employeeFirstName"
						type="text" 
						ref="employeeFirstName"
						placeholder="First Name"
						defaultValue={employee.employeeFirstName}
					/>
					</div>
					<label className="control-label col-sm-2" htmlFor="employeeLastName">Last Name:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="employeeLastName"
						type="text" 
						ref="employeeLastName"
						placeholder="Last Name"
						defaultValue={employee.employeeLastName}
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="employeeStartDate">Start Date:</label>
					<div className="col-sm-3">
					<input
						className="form-control"
						id="employeeStartDate"
						type="date"
						ref="employeeStartDate"
						placeholder="Start Date"
						defaultValue={this.date()}
					/>
					</div>
					<label className="control-label col-sm-3" htmlFor="employeeExperience">Experience (Years):</label>
					<div className="col-sm-3">
					<input
						className="form-control"
						id="employeeExperience"
						type="number"
						ref="employeeExperience"
						placeholder="Experience"
						min="0"
						max="100"
						step="1"
						defaultValue={employee.employeeExperience}
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="employeeHourlyRate">Hourly Rate ($):</label>
					<div className="col-sm-3">
					<input
						className="form-control"
						id="employeeHourlyRate"
						type="number"
						ref="employeeHourlyRate"
						placeholder="Hourly Rate"
						min="10.00"
						max="1000.00"
						step="0.01"
						defaultValue={employee.employeeHourlyRate}
					/>
					</div>

					<label className="control-label col-sm-3" htmlFor="userName">
						Username: {employee.userName}
					</label>
					</div>
					
					<div className="col-sm-10">
						<button className="btn btn-primary pull-right" onClick={this.back.bind(this)}>
							Back to Employees<span className="glyphicon glyphicon-return"></span>
						</button>
					</div>
					<div className="col-sm-2">
						<input type="submit" className="btn btn-primary" value="Save Changes"/>
					</div>
				</form>
			)
	}
}
