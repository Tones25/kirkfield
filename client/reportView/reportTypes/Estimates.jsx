import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import Dropdown from '../../parameterInputComponents/Dropdown.jsx';
import CheckboxGroup from '../../parameterInputComponents/CheckboxGroup.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import BarChart from '../chartTypes/BarChart.jsx';
import JobSingle from '../../jobView/JobSingle.jsx';
import {Employees} from './../../employeeView/EmployeeInputWrapper.jsx';
import {Customers} from './../../customerView/CustomerInputWrapper.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';
import PieChart from '../chartTypes/PieChart.jsx';
import SearchBox from '../../parameterInputComponents/SearchBox.jsx';
import DataTable from './../../DataTable.jsx';
export default class Estimates extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		
		let today = new Date();
		let lastWeek = new Date();
		lastWeek.setDate(today.getDate() - 7);
		
		this.state = {
			startDate: lastWeek,
			endDate: today,
			subscription: {
				customers: Meteor.subscribe("allCustomers")
			}
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
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
	
	mapJobItemsForEstimatePie(jobItems) {
		let jobTypes = this.findAllValuesOfCollectionAttribute(Jobs, 'jobTypeCode')
		let data = [];
		for (let i = 0; i < jobTypes.length; i++) {
			data.push({label: jobTypes[i], count: 0});
		}
		for(let i = 0; i < jobItems.length; i++) {
			let j = 0;
			while(data[j].label != jobItems[i].jobTypeCode) {
				j++;
			}
			data[j].count += 1;
		}
		return data;
	}
	
	mapJobItemsForJobTypePie(jobItems) {
		let jobTypes = ["Estimates", "Completed Jobs"];
		let data = [];
		for (let i = 0; i < jobTypes.length; i++) {
			data.push({label: jobTypes[i], count: 0});
		}
		for(let i = 0; i < jobItems.length; i++) {
			if (jobItems[i].installCost == 0) {
				data[0].count += 1;
			} else {
				data[1].count += 1;
			}
		}
		return data;
	}
	
	jobs() {
		return Jobs.find({
			date: {
				$gte: this.state.startDate,
				$lte: this.state.endDate
			}
		}).fetch();
	}
	estimates() {
		return Jobs.find({
			installCost: 0,
			date: {
				$gte: this.state.startDate,
				$lte: this.state.endDate
			}
		}).fetch();
	}
	
	render() {
		const chartHeight = 480;
		return (
			<div>
				<div className="well well-sm">
					<h2>Estimate Summary</h2>
					<form className="form-horizontal">
						<DateInputRange 
						startDate={this.state.startDate}
						endDate={this.state.endDate}
						onStartDateChange={this.handleStartDateChange}
						onEndDateChange={this.handleEndDateChange}
						/>
					
					<div className="col-md-6">
					<h3>Estimates Vs Jobs Completed</h3>
					<PieChart
						id="estimatesVsComplete"
						data={this.mapJobItemsForJobTypePie(this.jobs())}
						height={480}
						/>
					</div>
					<div className="col-md-6">
					<h3>Estimate Job Types</h3>
					<PieChart
						id="estimateJobTypes"
						data={this.mapJobItemsForEstimatePie(this.estimates())}
						height={480}
						/>
					</div>
					
					</form>
				</div>
			</div>
			)
	}
} 