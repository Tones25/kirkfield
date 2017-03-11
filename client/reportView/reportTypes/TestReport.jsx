import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';
import BarChart from '../chartTypes/BarChart.jsx';


export default class TestReport extends TrackerReact(React.Component) {

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

		let jobs = Jobs.find({
		date:{
			$gte: this.state.startDate,
			$lt: this.state.endDate
			}
		}).fetch();

		jobs.map( (d) => {
			data[d.date.getMonth()].qty += 1;
		});

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
			/>
			<BarChart data={this.mapJobItems()} width={width} height={height}/>
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