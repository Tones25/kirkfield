import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';

export default class JobsByEmployee extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		
		let jobTypes = [];
		let jobTypesCursor = Jobs.find({}, {jobTypeCode: 1});
		jobTypesCursor.map(
			function(j) { 
				if(this.includes(j.jobTypeCode))
					return;
				else 
					this.push(j.jobTypeCode); },
		jobTypes);

		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			employee: Employees.findOne()._id,
			jobTypes: jobTypes,
			selectedJobTypes: []
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
		this.handleJobTypesChange = this.handleJobTypesChange.bind(this);
	}

	handleEmployeeChange(employee) {
		this.setState({
			employee: employee,
		});
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

	handleJobTypesChange(toggled) {
		let newSelectedJobTypes = this.toggleMembership(toggled, this.state.selectedJobTypes);
		this.setState({selectedJobTypes: newSelectedJobTypes});
	}
	
	jobItems() {
		let employeeNumber = Employees.findOne({"_id": this.state.employee}).employeeId;
		let selectedJobTypes = this.state.selectedJobTypes;
		return Jobs.find({
			"estimateEmployee": employeeNumber,
			"jobTypeCode": { $in: selectedJobTypes }
		}).fetch();
	}

	render() {
		let employees = Employees.find().fetch();
		let jobTypes = this.state.jobTypes;
		return (
			<div>
			<Dropdown
				onSelectionChange={this.handleEmployeeChange}
				options={Employees.find().fetch()}
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