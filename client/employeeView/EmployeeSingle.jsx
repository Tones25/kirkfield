import React, {Component} from 'react';

export default class EmployeeSingle extends Component {

	editEmployee() {
		FlowRouter.go('/employee/' + this.props.employee._id);
	}

	deleteEmployee() {
		Meteor.call('deleteEmployee', this.props.employee);
	}

	render() {
		return (
			<div>
				
				<ul className="list-group">
					<li className="list-group-item">
						Employee Id: {this.props.employee.employeeId}
					</li>
					<li className="list-group-item">
						First Name: {this.props.employee.employeeFirstName}
					</li>
					<li className="list-group-item">
						Last Name: {this.props.employee.employeeLastName}
					</li>
					<li className="list-group-item">
						Start Date: {this.props.employee.employeeStartDate.toDateString()}
					</li>
					<li className="list-group-item">
						Experience: {this.props.employee.employeeExperience} Years
					</li>
					<li className="list-group-item">
						Hourly Rate: ${this.props.employee.employeeHourlyRate}
					</li>
				</ul>
					
				<div className="pull-right">
					<button className="btn btn-warning"
						style={{'marginRight': '5px'}}
						onClick={this.editEmployee.bind(this)}>
						Edit <span className="glyphicon glyphicon-pencil"></span> 
					</button>
					   
					<button className="btn btn-danger"
						style={{'marginLeft': '5px'}}
						onClick={this.deleteEmployee.bind(this)}>
						Delete <span className="glyphicon glyphicon-trash"></span> 
					</button>
				</div>
			</div>
		)
	}
}