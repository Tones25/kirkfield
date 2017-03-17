import React, {Component} from 'react';
import {Employees} from './../employeeView/EmployeeInputWrapper.jsx';

export default class EmployeeForm extends Component {
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
	addEmployee(event) {
		event.preventDefault();
		let employeeId = this.refs.employeeId.value.trim();
		let employeeFirstName = this.refs.employeeFirstName.value.trim();
		let employeeLastName = this.refs.employeeLastName.value.trim();
		let employeeStartDate = this.refs.employeeStartDate.value.trim();
		let employeeExperience = this.refs.employeeExperience.value.trim();
		let employeeHourlyRate = this.refs.employeeHourlyRate.value.trim();
		
		if(employeeId) {
			Meteor.call('addEmployee', employeeId, employeeFirstName, 
				employeeLastName, employeeStartDate, employeeExperience, 
				employeeHourlyRate, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			Bert.alert('Successfully added ' + employeeFirstName + ' ' + employeeLastName + ' to Employees.', 'success', 'fixed-top', 'fa-smile-o');
			this.refs.employeeId.value = parseInt(employeeId) + 1; 
			this.refs.employeeFirstName.value = "";
			this.refs.employeeLastName.value = "";
			this.refs.employeeStartDate.value = "";
			this.refs.employeeExperience.value = "";
			this.refs.employeeHourlyRate.value = "";
			}
		});
		}
	}
	
	render() {
		newId = Employees.findOne(
			{},
			{sort: {employeeId: -1},
			limit: 1}
		);
		if (!newId) {
			return (<div>Loading...</div>);
		}
		return(
			
			<form className="form-horizontal" onSubmit={this.addEmployee.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="employeeId">Employee Id:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="employeeId"
						type="number"
						ref="employeeId"
						defaultValue={parseInt(newId.employeeId) + 1}
						placeholder="Employee Id"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="employeeFirstName">First Name:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="employeeFirstName"
						type="text" 
						ref="employeeFirstName"
						placeholder="First Name"
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
					/>
					</div>
					<label className="control-label col-sm-2" htmlFor="employeeExperience">Experience (Years):</label>
					<div className="col-sm-2">
					<input
						className="form-control"
						id="employeeExperience"
						type="number"
						ref="employeeExperience"
						placeholder="Experience"
						min="0"
						max="100"
						step="1"
					/>
					</div>
					<label className="control-label col-sm-2" htmlFor="employeeHourlyRate">Hourly Rate ($):</label>
					<div className="col-sm-2">
					<input
						className="form-control"
						id="employeeHourlyRate"
						type="number"
						ref="employeeHourlyRate"
						placeholder="Hourly Rate"
						min="10.00"
						max="1000.00"
						step="0.01"
					/>
					</div>
					
					</div>
					
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)
	}
}
