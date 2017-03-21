import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';
import PieChartVarient from '../chartTypes/PieChartVarient.jsx';


export default class TotalInvoicesByType extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			
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

	jobItems() {
		return Jobs.find({
		date:{
			$gte: this.state.startDate,
			$lt: this.state.endDate
			}
		}).fetch();
	}

	mapJobItems() {
		
		
		let data = [
			{ label: "a", count: 0},
			{ label: "b", count: 0},
			{ label: "c", count: 0},
		];

		let jobs = Jobs.find({
			date:{
				$gte: this.state.startDate,
				$lte: this.state.endDate
				}
		}).fetch();

		for(let i = 0; i < jobs.length; i++) {
			if(jobs[i].jobTypeCode == 'a')
				data[0].count += 1;
			else if(jobs[i].jobTypeCode =='b')
				data[1].count += 1;
			else if(jobs[i].jobTypeCode == 'c')
				data[2].count += 1;
			else
				console.log('error mapping data point');
		}


		console.log(data);
		return data;
	}

	render() {
		const width = 640;
		const height = 480;
		return (
			<div>
			<DateInputRange 
				onStartDateChange={this.handleStartDateChange}
				onEndDateChange={this.handleEndDateChange}
				startDate={this.state.startDate}
				endDate={this.state.endDate}
			/>
			
			<div className="row">
				<div className="col-sm-6">
					<h1>Total Invoices by Type:</h1>
					<PieChartVarient data={this.mapJobItems()} width={width} height={height}/>
				</div>
			</div>
			
			
			
			</div>
			)
	}
} 