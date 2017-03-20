import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import BarChart from '../chartTypes/BarChart.jsx';
import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';
import PieChart from '../chartTypes/PieChart.jsx';
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
		
		let today = new Date();
		let lastWeek = new Date();
		lastWeek.setDate(today.getDate() - 7);
		
		this.state = {
			startDate: lastWeek,
			endDate: today,
			employee: 1,
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
	}

	employees() {
		return Employees.find().fetch();
	}
	
	handleEmployeeChange(employee) {
		let employeeId = parseInt(employee.value);
		this.setState({employee: employeeId});
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
	
	employeeEstimateJobs() {
		let employee = this.state.employee;
		return Jobs.find({
			estimateEmployee: employee,
			date: {
				$gte: this.state.startDate,
				$lte: this.state.endDate
			}
		}).fetch();
	}

	employeeInstallJobs() {
		let employee = this.state.employee;
		return Jobs.find({
			installEmployee: employee,
			date: {
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
	
	mapJobItemsForPie(jobItems) {
		let jobTypes = this.findAllValuesOfCollectionAttribute(Jobs, 'jobTypeCode')
		let data = [];
		for (let i = 0; i < jobTypes.length; i++) {
			data.push({label: jobTypes[i], count: 0});
		}
		
		console.log(jobItems);
		for(let i = 0; i < jobItems.length; i++) {
			let j = 0;
			while(data[j].label != jobItems[i].jobTypeCode) {
				j++;
			}
			data[j].count += 1;
		}

		console.log(data);
		return data;
	}
	
	render() {
		const chartHeight = 480;
		let employeeEstimates = this.employeeEstimateJobs();
		let employeeInstalls = this.employeeInstallJobs();
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
				
				<div className="col-md-6">
					<h3>Estimate Jobs</h3>
					<BarChart 
						id="estimateJobs" 
						data={this.mapJobItems(employeeEstimates)} 
						height={chartHeight}/>
				</div>
				
				<div className="col-md-6">
					<h3>Install Jobs</h3>
					<BarChart 
						id="installJobs" 
						data={this.mapJobItems(employeeInstalls)} 
						height={chartHeight}/>
				</div>

				<div className="col-md-6">
					<h3>Estimate Job Types</h3>
					<PieChart 
						id="estimateJobTypes" 
						data={this.mapJobItemsForPie(employeeEstimates)} 
						height={chartHeight}/>
				</div>
				
				<div className="col-md-6">
					<h3>Install Job Types</h3>
					<PieChart 
						id="installJobTypes" 
						data={this.mapJobItemsForPie(employeeInstalls)} 
						height={chartHeight}/>
				</div>
					
			</form>

			</div>
			</div>
			)
	}
} 