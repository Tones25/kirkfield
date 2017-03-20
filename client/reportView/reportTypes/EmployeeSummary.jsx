import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import BarChart from '../chartTypes/BarChart.jsx';
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
		let today = new Date();
		let lastWeek = new Date();
		lastWeek.setDate(today.getDate() - 7);
		
		this.state = {
			startDate: lastWeek,
			endDate: today,
			jobTypes: jobTypes,
			selectedJobTypes: [],
			employee: '1',
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
	
	employeeEstimateJobs() {
		let selectedJobTypes = this.state.selectedJobTypes;
		//console.log(this.state.employee);
		//console.log(this.state.startDate);
		//console.log(this.state.endDate);
		//console.log(Jobs.find({'installEmployee': this.state.employee}).fetch());
		return Jobs.find({
			'estimateEmployee': parseInt(this.state.employee),
			'date': {
				$gte: this.state.startDate,
				$lte: this.state.endDate
			}
		}).fetch();
	}

	mapJobItems(jobItems) {
		let trimmedData = [];
		let startDate = this.state.startDate;
		let endDate = this.state.endDate;
		
		if(endDate.getMonth() - startDate.getMonth() < 1) {
			let data = [];
			for (let i = 1; i <= 31; i++) {
				data.push({qty: 0, xLabel: i});
			}
			jobItems.map( (d) => {
				data[d.date.getDate() - 1].qty += 1;
			});
			for(let i = startDate.getDate() - 1; i < endDate.getDate(); i++) {
					trimmedData.push(data[i]);
			}	
		} else {
			let data = [
				{ qty: 0, xLabel: "Jan"},
				{ qty: 0, xLabel: "Feb"},
				{ qty: 0, xLabel: "Mar"},
				{ qty: 0, xLabel: "Apr"},
				{ qty: 0, xLabel: "May"},
				{ qty: 0, xLabel: "Jun"},
				{ qty: 0, xLabel: "Jul"},
				{ qty: 0, xLabel: "Aug"},
				{ qty: 0, xLabel: "Sep"},
				{ qty: 0, xLabel: "Oct"},
				{ qty: 0, xLabel: "Nov"},
				{ qty: 0, xLabel: "Dec"},
			];
			jobItems.map( (d) => {
				data[d.date.getMonth()].qty += 1;
			});
			for(let i = 0; i < data.length; i++) {
				if(data[i].qty > 0)
					trimmedData.push(data[i]);
			}	
		}
		return trimmedData;
	}
	
	render() {
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
						startDate={this.state.startDate}
						endDate={this.state.endDate}
						onStartDateChange={this.handleStartDateChange}
						onEndDateChange={this.handleEndDateChange}
				/>
				
				<BarChart data={this.mapJobItems(this.employeeEstimateJobs())} width={640} height={480}/>
				
				<CheckboxGroup
					onSelectionChange={this.handleJobTypesChange}
					options={this.state.jobTypes}
				/>
					
			</form>

			</div>
			</div>
			)
	}
} 