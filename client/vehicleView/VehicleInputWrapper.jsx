import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import VehicleForm from './VehicleForm.jsx';
import VehicleSingle from './VehicleSingle.jsx';
import DataTable from './../DataTable.jsx';
import LoginForm from '../LoginForm.jsx';

export const Vehicles = new Mongo.Collection("vehicles");

export default class VehicleInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				vehicles: Meteor.subscribe("allVehicles")
			},
			search: ""
		}
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentWillUnmount() {
		this.state.subscription.vehicles.stop();
	}

	handleSearchChange() {
		let search = document.getElementById("search").value;
		this.setState({
			search: search,
		});
	}

	vehicles() {
		return Vehicles.find(
			{$or:[
			{description:{
			$regex: this.state.search, "$options": "i",
			}},
			{vehicleMake:{
			$regex: this.state.search, "$options": "i",
			}},
			{vehicleModel:{
			$regex: this.state.search, "$options": "i",
			}},
			{licensePlate:{
			$regex: this.state.search, "$options": "i",
			}},
			{driverName:{
			$regex: this.state.search, "$options": "i"
			}}]}
		).fetch();
	}

	render() {
		this.state.vehicles = this.vehicles();
		let tableRowHeight = 50;
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
					<h1>Vehicle Listing</h1>
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
						columns={['vehicleModelYear', 'vehicleMake', 'vehicleModel', 'licensePlate', 'driverName']}
						columnNames={['Model Year', 'Make', 'Model', 'License Plate', 'Driver']}
						deleteButtons={true}
						deleteFunction={'deleteVehicle'}
						editButtons={true}
						editFunction={ function(route) {FlowRouter.go("/vehicle/" + route._id);} }
						data={this.state.vehicles}
					/>
				</div>
				</div>
			</div>
		)
	}
}

