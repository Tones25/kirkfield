import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import JobForm from './JobForm.jsx';
import JobSingle from './JobSingle.jsx';

import {Vehicles} from './../vehicleView/VehicleInputWrapper.jsx';

export const Jobs = new Mongo.Collection("jobs");

export default class JobInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				jobs: Meteor.subscribe("allJobs"),
				vehicles: Meteor.subscribe("allVehicles")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.jobs.stop();
		this.state.subscription.vehicles.stop();
	}

	jobItems() {
		return Jobs.find().fetch();
	}

	vehicles() {
		return Vehicles.find().fetch();
	}

	render() {
		
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
					<h1>Recently Added Jobs</h1>
				</div>
				<div className="panel-body">
				<ul className="resolutions">
					{this.jobItems().map( (jobItems) => {
						return <JobSingle key={jobItems._id} jobItem={jobItems} />
					})}
				</ul>
				</div>
			</div>
		</div>
		)
	}
}

