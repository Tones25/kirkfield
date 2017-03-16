import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import NumberOfInvoicesReport from './reportTypes/NumberOfInvoicesReport';
import ReportA from './reportTypes/ReportA';
import JobsByEmployee from './reportTypes/JobsByEmployee.jsx';
import EmployeeSummary from './reportTypes/EmployeeSummary.jsx';
import TotalInvoicesByType from './reportTypes/TotalInvoicesByType.jsx';




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
		//this.handleSubmit = this.handleSubmit.bind(this);
		this.reportInputs = this.reportInputs.bind(this);

	}

	componentWillUnmount() {
		
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	//handleSubmit(event) {
	//	alert('oi ' + this.state.value);
	//	event.preventDefault();
	//}

	//This will act as a running list of report types
	//for conditional rendering based on the select forms value
	reportInputs() {
		reportType = this.state.value;

		if(reportType == 'NumberOfInvoicesReport')
			return(<NumberOfInvoicesReport />)
		if(reportType == 'ReportA')
			return(<ReportA />)
		if(reportType == 'JobsByEmployee')
			return(<JobsByEmployee/>)
		if(reportType == 'EmployeeSummary')
			return(<EmployeeSummary/>)
		if(reportType == 'TotalInvoicesByType')
			return(<TotalInvoicesByType/>)
		
	}

	

	render() {
		
		if (!Meteor.userId()) {
			return (<h1>You must be logged in.</h1>)
		}
		return(
			<div className="row">
				<form >
					<label>
						Chose report:
						<select value={this.state.value} onChange={this.handleChange}>
							<option value=""> </option>
							<option value="EmployeeSummary">Employee Summary</option>
							<option value="ReportA">Report A</option>
							<option value="NumberOfInvoicesReport">Number Of Inovices</option>
							<option value="JobsByEmployee">Jobs By Employee</option>
							<option value="report3">Report 3</option>
							<option value="TotalInvoicesByType"> Total Invoices By Type</option>
						</select>
					</label>	
					
					{this.reportInputs()}
				</form>
			</div>

		)
	}
}

