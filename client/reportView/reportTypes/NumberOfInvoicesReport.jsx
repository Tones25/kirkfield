import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';
import BarChart from '../chartTypes/BarChart.jsx';


export default class NumberOfInvoicesReport extends TrackerReact(React.Component) {

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
		let trimmedData = [];
		if(this.state.endDate.getMonth() - this.state.startDate.getMonth() < 1) {
			let data = [
				{ qty: 0, xLabel: "1"},
				{ qty: 0, xLabel: "2"},
				{ qty: 0, xLabel: "3"},
				{ qty: 0, xLabel: "4"},
				{ qty: 0, xLabel: "5"},
				{ qty: 0, xLabel: "6"},
				{ qty: 0, xLabel: "7"},
				{ qty: 0, xLabel: "8"},
				{ qty: 0, xLabel: "9"},
				{ qty: 0, xLabel: "10"},
				{ qty: 0, xLabel: "11"},
				{ qty: 0, xLabel: "12"},
				{ qty: 0, xLabel: "13"},
				{ qty: 0, xLabel: "14"},
				{ qty: 0, xLabel: "15"},
				{ qty: 0, xLabel: "16"},
				{ qty: 0, xLabel: "17"},
				{ qty: 0, xLabel: "18"},
				{ qty: 0, xLabel: "19"},
				{ qty: 0, xLabel: "20"},
				{ qty: 0, xLabel: "21"},
				{ qty: 0, xLabel: "22"},
				{ qty: 0, xLabel: "23"},
				{ qty: 0, xLabel: "24"},
				{ qty: 0, xLabel: "25"},
				{ qty: 0, xLabel: "26"},
				{ qty: 0, xLabel: "27"},
				{ qty: 0, xLabel: "28"},
				{ qty: 0, xLabel: "29"},
				{ qty: 0, xLabel: "30"},
				{ qty: 0, xLabel: "31"}
			];

			let jobs = Jobs.find({
			date:{
				$gte: this.state.startDate,
				$lte: this.state.endDate
				}
			}).fetch();

			

			jobs.map( (d) => {
				data[d.date.getDate() - 1].qty += 1;
			});

			
			for(let i = this.state.startDate.getDate() - 1; i < this.state.endDate.getDate(); i++) {
				
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
	
			let jobs = Jobs.find({
			date:{
				$gte: this.state.startDate,
				$lt: this.state.endDate
				}
			}).fetch();
	
			jobs.map( (d) => {
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
		const width = 640;
		const height = 480;
		return (
			<div>
			<DateInputRange 
				onStartDateChange={this.handleStartDateChange}
				onEndDateChange={this.handleEndDateChange}
			/>

			<div className="row">
			<div className="col-sm-6">
			<BarChart id="chartTwo" data={this.mapJobItems()} height={height}/>
			
			</div>
			<div className="col-sm-6">
			<BarChart id="chartOne" data={this.mapJobItems()} height={height}/>
			</div>
		
			</div>
			<div className="row">
			<div className="col-sm-6">
			<BarChart id="chartTwot" data={this.mapJobItems()} height={height}/>
			
			</div>
			<div className="col-sm-6">
			<BarChart id="chartOnet" data={this.mapJobItems()} height={height}/>
			</div>
		
			</div>
			
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