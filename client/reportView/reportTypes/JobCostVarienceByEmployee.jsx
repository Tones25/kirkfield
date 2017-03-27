import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';

import SearchBox from '../../parameterInputComponents/SearchBox.jsx';
import PositiveNegativeBarChart from '../chartTypes/positiveNegativeBarChart/PositiveNegativeBarChart.jsx';



export default class JobCostVarienceByEmployee extends TrackerReact(React.Component) {

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

		let today = new Date();
		let oneMonthAgo = new Date();
		oneMonthAgo.setDate(today.getDate() - 30);
		this.state = {
			startDate: oneMonthAgo,
			endDate: today,
			employee: 1,
			jobTypes: jobTypes,
			selectedJobTypes: []
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
		this.handleJobTypesChange = this.handleJobTypesChange.bind(this);
	}

	handleEmployeeChange(employee) {
		this.setState({employee: parseInt(employee.value)})
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
		
		let employeeNumber = Employees.findOne({"employeeId": this.state.employee}).employeeId;
		let selectedJobTypes = this.state.selectedJobTypes;
		
		return Jobs.find({
			"installEmployee": employeeNumber,
			"jobTypeCode": { $in: selectedJobTypes },
			"installCost": { $ne: 0 },
			"date":{
				$gte: this.state.startDate,
				$lte: this.state.endDate
			}}, 
			{sort: {date: 1}})
		.fetch();
	}





	employees() {
		return Employees.find().fetch();
	}

	currentEmployeeName() {
		return Employees.findOne({employeeId: this.state.employee}).employeeFirstName;
	}

	mapData() {
		let dataMap = [];


		let jobs = Jobs.find({
			"installEmployee": this.state.employee,
			"installCost": { $ne: 0 },
			"date":{
				$gte: this.state.startDate,
				$lte: this.state.endDate
			}}, 
			{sort: {date: 1}})
		.fetch();


		jobs.map( (d) => {
				var date = d.date.getDate() + '/' + (d.date.getMonth() + 1)  + '/' + d.date.getFullYear();
				var entry = {
					date: date,
					varience: d.installCost - d.estimateCost,
					jobType: d.jobTypeCode,
					invoice: d.invoice,
					estimate: d.estimateCost,
					actual: d.installCost
				};
				dataMap.push(entry);
			});
		
		return dataMap;
	}

	render() {
		let employees = Employees.find().fetch();
		let jobTypes = this.state.jobTypes;
		return (
			<div>
			<div className="well well-sm">
				<h2>Install vs Estimate Cost Varience</h2>

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
						startDate={this.state.startDate}
						endDate={this.state.endDate}
						onStartDateChange={this.handleStartDateChange}
						onEndDateChange={this.handleEndDateChange}
				/>
				
				<PositiveNegativeBarChart  data={this.mapData()} currentEmployee={this.currentEmployeeName()}/>
				
				
					
			</form>

			</div>
			</div>
			)
	}
} 