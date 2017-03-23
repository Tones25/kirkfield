import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import NumberOfInvoicesReport from './reportTypes/NumberOfInvoicesReport';
import ReportA from './reportTypes/ReportA';
import JobCostVarienceByEmployee from './reportTypes/JobCostVarienceByEmployee.jsx';
import EmployeeSummary from './reportTypes/EmployeeSummary.jsx';
import TotalInvoicesByType from './reportTypes/TotalInvoicesByType.jsx';
import JobsPendingApproval from './reportTypes/JobsPendingApproval.jsx'
import QualityServicePlans from './reportTypes/QualityServicePlans.jsx';
import Estimates from './reportTypes/Estimates.jsx';
import LoginForm from '../LoginForm.jsx';




export default class ReportWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			value: 'JobsPendingApproval',
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
		if(reportType == 'JobCostVarienceByEmployee')
			return(<JobCostVarienceByEmployee/>)
		if(reportType == 'EmployeeSummary')
			return(<EmployeeSummary/>)
		if(reportType == 'TotalInvoicesByType')
			return(<TotalInvoicesByType/>)
		if(reportType == 'JobsPendingApproval')
			return(<JobsPendingApproval/>)
		if(reportType == 'QualityServicePlans')
			return(<QualityServicePlans/>)
		if(reportType == 'Estimates')
			return(<Estimates/>)
	}

	

	render() {
		
		if(!Meteor.userId()) {
			return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Please Log In</h1>
				</div> 
				<div className="panel-body">
					<LoginForm/>
				</div>
			</div>
				)
		}
		if(!Roles.userIsInRole(Meteor.user(), 'admin')) {
			return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Access Denied</h1>
				</div> 
				
			</div>
				)
		}
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Reporting</h1>
				</div>
				<div className="panel-body">
				<form className="form-horizontal">
				<div className="well well-sm">
				<div className="form-group">
				<h3>
					<label className="control-label col-sm-4" htmlFor="chooseReport">
						Choose report:
					</label>
					<div className="col-sm-8">
					<select 
						className="form-control" 
						id="chooseReport" 
						value={this.state.value} 
						onChange={this.handleChange}>
							<option value="JobsPendingApproval">Jobs Pending Approval</option>
							<option value="QualityServicePlans">Quality Service Plans</option>
							<option value="Estimates">Estimates</option>
							<option value="EmployeeSummary">Employee Summary</option>
							<option value="NumberOfInvoicesReport">Number Of Invoices</option>
							<option value="JobCostVarienceByEmployee">Job Cost Variance By Employee</option>
							<option value="TotalInvoicesByType"> Total Invoices By Type</option>
							
							
					</select>	
					</div>
					</h3>
				</div>
				</div>
				</form>
				{this.reportInputs()}
				</div>
				</div>
			</div>

		)
	}
}

