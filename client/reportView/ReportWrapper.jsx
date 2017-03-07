import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import TestReport from './reportTypes/TestReport';
import ReportA from './reportTypes/ReportA';
import JobsByEmployee from './reportTypes/JobsByEmployee.jsx';
import EmployeeSummary from './reportTypes/EmployeeSummary.jsx';




export default class ReportWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			value: '',
			subscription: {
				jobs: Meteor.subscribe("allJobs"),
				employees: Meteor.subscribe("allEmployees")
			}
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.reportInputs = this.reportInputs.bind(this);

	}

	componentWillUnmount() {
		
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('oi ' + this.state.value);
		event.preventDefault();
	}

	//This will act as a running list of report types
	//for conditional rendering based on the select forms value
	reportInputs() {
		reportType = this.state.value;

		if(reportType == 'TestReport')
			return(<TestReport />)
		if(reportType == 'ReportA')
			return(<ReportA />)
		if(reportType == 'JobsByEmployee')
			return(<JobsByEmployee/>)
		if(reportType == 'EmployeeSummary')
			return(<EmployeeSummary/>)
		
	}

	

	render() {
		
		return(
		<div>
			<div className="row">
				<form 
					onSubmit={this.handleSubmit}
					className="form-horizontal">
					
					<div className="row">
					<div className="form-group col-sm-6">
						<label
							className="control-label col-sm-6"
							htmlFor="selectReport">
							Choose report:
						</label>
						<div className="col-sm-6">
							<select 
								id="selectReport"
								value={this.state.value} 
								onChange={this.handleChange}
								className="form-control">
								<option value=""> </option>
								<option value="EmployeeSummary">Employee Summary</option>
								<option value="ReportA">Report A</option>
								<option value="TestReport">Test Report</option>
								<option value="JobsByEmployee">Jobs By Employee</option>
								<option value="report3">Report 3</option>
							</select>
						</div>
					</div>
					<div className="col-sm-6">
						<button type="submit" className="btn btn-primary pull-right" value="submit">
							Submit
						</button>
					</div>
					</div>
					<div className="row">
					{this.reportInputs()}
					</div>
				</form>
			</div>
		</div>

		)
	}
}

