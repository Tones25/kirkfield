import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobForm from './JobForm.jsx';
import JobSingle from './JobSingle.jsx';

import {Vehicles} from './../vehicleView/VehicleInputWrapper.jsx';
import DataTable from './../DataTable.jsx';

export const Jobs = new Mongo.Collection("jobs");

export default class JobInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				jobs: Meteor.subscribe("allJobs"),
				vehicles: Meteor.subscribe("allVehicles")
			},
			search: ""
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentWillUnmount() {
		this.state.subscription.jobs.stop();
		this.state.subscription.vehicles.stop();
	}

	handleSearchChange() {
		let search = document.getElementById("search").value;
		this.setState({
			search: search,
		});
	}

	jobItems() {
		return Jobs.find().fetch();
	}

	vehicles() {
		return Vehicles.find().fetch();
	}

	render() {
		
		let tableRowHeight = 50;
		return(
		<div className="row">
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Add Job Details</h1>
				</div>
				<div className="panel-body">
					<JobForm vehicles={this.vehicles()}/>
				</div>
			</div>
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Job Listing</h1>
				</div>
				<div className="panel-body">		
					<input 
						type="text" 
						className="form-control"
						id="search"
						ref="search"
						placeholder="Search"
					onChange={this.handleSearchChange.bind(this)}
					/>
					<DataTable 
						rowHeight={tableRowHeight}
						columns={['invoice', 'customer', 'installCost', 'installEmployee']}
						columnNames={['Invoice#', 'Customer ID#', 'Charge ($)', 'Employee ID#']}
						deleteButtons={true}
						deleteFunction={'deleteJobItem'}
						editButtons={true}
						editFunction={ function(route) {FlowRouter.go("/job/" + route._id);} }
						data={this.jobItems()}
					/>
				</div>
			</div>
		</div>
		)
	}
}

