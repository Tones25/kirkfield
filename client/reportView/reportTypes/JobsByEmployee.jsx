import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';


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
		
		for(var i = 0; i < jobTypes.length; i++) {
			jobTypes[i] = { _id: jobTypes[i], selected: false };
		}
		
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			employee: Employees.findOne()._id,
			jobTypes: jobTypes
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
	
	handleJobTypesChange(jobType) {
		this.state.jobTypes.find(function(j) { return j._id === jobType;}).selected = !(this.state.jobTypes.find(function(j) { return j._id === jobType;}).selected);
		console.log("handle job types change");
	}
	
	jobItems() {
		
		let employeeNumber = Employees.findOne({"_id": this.state.employee}).employeeId;
		let jobTypes = this.state.jobTypes;
		console.log(jobTypes);
		let selectedJobTypes = [];
		jobTypes.map(
			function(j) { 
				if (j.selected === true) {
					console.log(this);
					this.push(j._id);
				}
			}, selectedJobTypes
		);
		console.log(selectedJobTypes);
		return Jobs.find({
			"estimateEmployee": employeeNumber,
			"jobTypeCode": { $in: selectedJobTypes }
		}).fetch();
	}

	render() {
		let employees = Employees.find().fetch();
		let jobTypes = this.state.jobTypes;
		console.log(this.jobItems());
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