import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import VehicleForm from './VehicleForm.jsx';
import VehicleSingle from './VehicleSingle.jsx';
import DataTable from './../DataTable.jsx';

export const Vehicles = new Mongo.Collection("vehicles");

export default class VehicleInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				vehicles: Meteor.subscribe("allVehicles")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.vehicles.stop();
	}

	vehicles() {
		return Vehicles.find().fetch();
	}

	render() {
		this.state.vehicles = this.vehicles();
		let tableRowHeight = 50;
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Add Vehicle</h1>
				</div>
				<div className="panel-body">
					<VehicleForm />
				</div>
				</div>
				
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Recently Added Vehicles</h1>
				</div>
				<div className="panel-body">
					<DataTable 
						rowHeight={tableRowHeight}
						columns={['vehicleName', 'vehicleModelYear', 'vehicleMake', 'vehicleModel', 'licensePlate']}
						columnNames={['Vehicle Name', 'Model Year', 'Make', 'Model', 'License Plate']}
						deleteButtons={true}
						deleteFunction={'deleteVehicle'}
						editButtons={true}
						data={this.state.vehicles}
					/>
				</div>
				</div>
			</div>
		)
	}
}

