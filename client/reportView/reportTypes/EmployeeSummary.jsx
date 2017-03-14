import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';

import SearchBox from '../../parameterInputComponents/SearchBox.jsx';

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
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			jobTypes: jobTypes,
			selectedJobTypes: [],
			selectedEmployees: []
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
		this.handleJobTypesChange = this.handleJobTypesChange.bind(this);
	}

	employees() {
		return Employees.find().fetch();
	}
	
	handleEmployeeChange(employee) {
		console.log(employee.value);
		this.setState({employee: employee.value})
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
		let jobTypes = this.state.jobTypes;
		
		return (
			<div>
			<div className="well well-sm">
				<h2>Employee Summary</h2>

			<form className="form-horizontal">
				<div className="form-group">
					<label className="control-label col-sm-2">Employee: </label>
					<div className="col-sm-4">
					<SearchBox
						options={this.employees()}
						onSelectionChange={this.handleEmployeeChange}
						inputElementListAttribute="selectEmployee"
						inputElementRefAttribute="selectEmployee"
						datalistElementIdAttribute="selectEmployee"
						datalistElementKey="employeeId"
						datalistElementValue="employeeFirstName"
						placeholder="Employee"
					/>
					</div>
				</div>
				
				<DateInputRange 
						onStartDateChange={this.handleStartDateChange}
						onEndDateChange={this.handleEndDateChange}
				/>
				<CheckboxGroup
					onSelectionChange={this.handleJobTypesChange}
					options={jobTypes}
				/>
					
			</form>

			</div>
			</div>
			)
	}
} 