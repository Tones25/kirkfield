import React, {Component} from 'react';
import DateInputRange from '../../parameterInputComponents/DateInputRange.jsx';
import FieldRange from '../../parameterInputComponents/FieldRange.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobSingle from '../../jobView/JobSingle.jsx';
import {Jobs} from './../../jobView/JobInputWrapper.jsx';


export default class ReportA extends TrackerReact(React.Component) {

	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			minCost: 0,
			maxCost: 10000,
			startDate: new Date(),
			endDate: new Date(),
			
		}
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);

		this.handleMinValueChange = this.handleMinValueChange.bind(this);
		this.handleMaxValueChange = this.handleMaxValueChange.bind(this);

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

	handleMinValueChange(minValue) {
		let min = parseInt(minValue);
		this.setState({
			minCost: min,
		});
	}

	handleMaxValueChange(maxValue) {
		let max = parseInt(maxValue);
		this.setState({
			maxCost: max,
		});
	}

	handleFirstNameChange(firstName) {
		let fName = document.getElementById("firstName").value;
		this.setState({
			firstName: fName,
		});
	}

	handleLastNameChange(lastName) {
		let lName = document.getElementById("lastName").value;
		this.setState({
			lastName: lName,
		});
	}

	jobItems() {
		return Jobs.find({
		firstName:{
			$regex: this.state.firstName, "$options": "i",
			},
		lastName:{
			$regex: this.state.lastName, "$options": "i",
			},
		installCost:{
			$gte: this.state.minCost,
			$lt: this.state.maxCost
		},
		date:{
			$gte: this.state.startDate,
			$lt: this.state.endDate
			}
		}).fetch();
	}

	render() {
		return (
			<div>
			<input 
						type="text" 
						className="form-control"
						id="firstName"
						ref="firstName"
						placeholder="First Name"
					onChange={this.handleFirstNameChange}
					/>
			<input 
						type="text" 
						className="form-control"
						id="lastName"
						ref="lastName"
						placeholder="Last Name"
					onChange={this.handleLastNameChange}
					/>
			<br/>
			<p>Cost:</p>
			<FieldRange
				onMinValueChange={this.handleMinValueChange}
				onMaxValueChange={this.handleMaxValueChange}
			/>
			<br/>
			<DateInputRange 
				onStartDateChange={this.handleStartDateChange}
				onEndDateChange={this.handleEndDateChange}
				startDate={this.state.startDate}
				endDate={this.state.endDate}
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