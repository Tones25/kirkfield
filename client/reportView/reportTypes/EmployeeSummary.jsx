import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';

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
		let employees = this.findAllValuesOfCollectionAttribute(Employees, 'employeeFirstName');
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
			"estimateEmployee": { $in: selectedEmployees },
			"jobTypeCode": { $in: selectedJobTypes }
		}).fetch();
	}

	render() {
		let employees = this.state.employees;
		let jobTypes = this.state.jobTypes;
		
		return (
			<div>
			<CheckboxGroup
				onSelectionChange={this.handleEmployeeChange}
				options={employees}
			/>
			<CheckboxGroup
				onSelectionChange={this.handleJobTypesChange}
				options={jobTypes}
			/>
			<DateInputRange 
				onStartDateChange={this.handleStartDateChange}
				onEndDateChange={this.handleEndDateChange}
			/>
			<div className="panel-body">
				<ul className="resolutions">
					{this.jobItems().map( (jobItems) => {
						return <JobSingle key={jobItems._id} jobItem={jobItems} />
					})}
				</ul>
			</div>
			
			</div>
			)
	}
} 