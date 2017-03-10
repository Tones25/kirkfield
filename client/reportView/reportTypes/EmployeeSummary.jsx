import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import DataTable from './../../DataTable.jsx';

export default class EmployeeSummary extends TrackerReact(React.Component) {

	findAllValuesOfCollectionAttribute(collection, attribute) {
		let values = [];
		let attributeCursor = collection.find({}, {attribute: 1});
		attributeCursor.map(
			function(a) {
				if(this.includes(a[attribute]))
					return;
				else
					this.push(a[attribute]);
			}
		,values);
		return values;
	}
	
	constructor(props) {
		super(props);
		
		let jobTypes = this.findAllValuesOfCollectionAttribute(Jobs, 'jobTypeCode');
		let employees = this.findAllValuesOfCollectionAttribute(Employees, '_id');
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			employees: employees,
			jobTypes: jobTypes,
			selectedJobTypes: [],
			selectedEmployees: []
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
		this.handleJobTypesChange = this.handleJobTypesChange.bind(this);
	}

	handleEmployeeChange(employee) {
		let newSelectedEmployees = this.toggleMembership(employee, this.state.selectedEmployees);
		this.setState({selectedEmployees: newSelectedEmployees});
	}

	handleStartDateChange(startDate) {
		let dateTokens = startDate.split("-");
		let dateYear = parseInt(dateTokens[0]);
		let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
		let dateDay = parseInt(dateTokens[2]);
		let parsedDate = new Date(dateYear, dateMonth, dateDay);
		this.setState({
			startDate: parsedDate,
		});
	}

	handleEndDateChange(endDate) {
		let dateTokens = endDate.split("-");
		let dateYear = parseInt(dateTokens[0]);
		let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
		let dateDay = parseInt(dateTokens[2]);
		let parsedDate = new Date(dateYear, dateMonth, dateDay);
		this.setState({
			endDate: parsedDate,
		});
	}
	
	toggleMembership(toggled, alreadySelected) {
		let toggledIndex = alreadySelected.indexOf(toggled);
		if (toggledIndex === -1) {
			alreadySelected.push(toggled);
		} else {
			alreadySelected.splice(toggledIndex, 1);
		}
		return alreadySelected;
	}

	handleJobTypesChange(jobType) {
		let newSelectedJobTypes = this.toggleMembership(jobType, this.state.selectedJobTypes);
		this.setState({selectedJobTypes: newSelectedJobTypes});
	}
	
	jobItems() {
		
		let selectedEmployees = this.state.selectedEmployees;
		let selectedJobTypes = this.state.selectedJobTypes;
		
		return Jobs.find({
			$and: [
				{"estimateEmployee": { $in: selectedEmployees }},
				{"jobTypeCode": { $in: selectedJobTypes }},
				{"date": { 	$gte: this.state.startDate,
							$lte: this.state.endDate }
				}
			]
		}).fetch();
	}

	employees() {
		return Employees.find().fetch();
	}
	
	render() {
		let employees = this.state.employees;
		let jobTypes = this.state.jobTypes;
		
		return (
			<div>
			<form
				className="form-horizontal">
			
			<div className="row">
				<div className="panel-group col-sm-6">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h4 className="panel-title">
								<a data-toggle="collapse" href="#employeesCollapse">Employees</a>
							</h4>
						</div>
						<div id="employeesCollapse" className="panel-collapse collapse">
							<div className="panel-body">
								<CheckboxGroup
									onSelectionChange={this.handleEmployeeChange}
									options={this.employees()}
									keyProperty="_id"
									labelProperty="employeeFirstName"
								/>
							</div>
						</div>
					</div>
				</div>
			
			<div className="col-sm-6">
			<CheckboxGroup
				onSelectionChange={this.handleJobTypesChange}
				options={jobTypes}
				label="Job Types"
			/>
			</div>
			
			</div>
			
			<div className="row">
				<div className="col-sm-12">
				<DateInputRange 
					onStartDateChange={this.handleStartDateChange}
					onEndDateChange={this.handleEndDateChange}
				/>
				</div>
			</div>
			
			</form>
			
			<div className="row">
				<DataTable
					rowHeight={50}
					columns={['installEmployee', '_id']}
					columnNames={['Install Employee', 'Job ID']}
					data={this.jobItems()}
				/>
			</div>
			
			</div>
			)
	}
} 