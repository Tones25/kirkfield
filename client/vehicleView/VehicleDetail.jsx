import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Vehicles} from './VehicleInputWrapper.jsx';
import {Employees} from './../employeeView/EmployeeInputWrapper';

export default class VehicleDetail extends TrackerReact(Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				vehicles: Meteor.subscribe("allVehicles"),
				employees: Meteor.subscribe("allEmployees")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.vehicles.stop();
		this.state.subscription.employees.stop();
	}

	employees() {
		return Employees.find().fetch();
	}

	vehicle() {
		return Vehicles.findOne(this.props.id);
	}

	date(oil) {
		let vehicle = this.vehicle();
		//console.log(customer);
		if (oil == 'o')
		newDate = new Date(parseInt(vehicle.lastOil.getFullYear()), parseInt(vehicle.lastOil.getMonth()), parseInt(vehicle.lastOil.getDate()));
		if (oil == 'n')
		newDate = new Date(parseInt(vehicle.nextOil.getFullYear()), parseInt(vehicle.nextOil.getMonth()), parseInt(vehicle.nextOil.getDate()));
		return newDate.toISOString().substr(0,10);
	}

	editVehicle(event) {
		event.preventDefault();
		let vehicleMake = this.refs.vehicleMake.value.trim();
		let vehicleModel = this.refs.vehicleModel.value.trim();
		let vehicleModelYear = this.refs.vehicleModelYear.value.trim();
		let licensePlate = this.refs.licensePlate.value.trim();
		let color = this.refs.vehicleColor.value.trim();
		let driver = this.refs.driver.value.trim();
		let initialMileage = this.refs.initialMileage.value.trim();
		let repairHist = this.refs.repairHist.value.trim();
		let description = this.refs.description.value.trim();
		let lastOil = this.refs.lastOil.value.trim();
		let nextOil = this.refs.nextOil.value.trim();
		let validInput = true;
		
		//add further input validation rules here
		if (vehicleModelYear < 0) {
			Bert.alert('year can\'t be negative', 'danger', 'fixed-top', 'fa-frown-o');
			validInput = false;
		}
		if (validInput) {
			Meteor.call('editVehicle', this.vehicle(), vehicleMake,
				vehicleModel, vehicleModelYear, licensePlate, color,
				driver, initialMileage, repairHist, description,
				lastOil, nextOil, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
				Bert.alert('Successfully updated Item: ' + vehicleModelYear + " " + vehicleMake + " " + vehicleModel, 'success', 'fixed-top', 'fa-smile-o');
			}
		});
		}
	}

	back() {
		FlowRouter.go("/vehicleInput");
	}

	render() {
		let vehicle = this.vehicle();

		if(!vehicle) {
			return(<div>Loading...</div>)
		}
		return(
			<div className="row">				
				<button className="btn btn-primary" onClick={this.back.bind(this)}>
						Back to Vehicles<span className="glyphicon glyphicon-return"></span>
				</button>
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Vehicle #{vehicle.vehicleId}</h1>
				</div>
				<div className="panel-body">
					<form className="form-horizontal" onSubmit={this.editVehicle.bind(this)}>
					<div className="form-group">
					
					<label className="control-label col-sm-2" htmlFor="vehicleMake">Make:</label>
					<div className="col-sm-2">
					<input 
						className="form-control"
						id="vehicleMake"
						type="text" 
						ref="vehicleMake"
						defaultValue={vehicle.vehicleMake}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="vehicleModel">Model:</label>
					<div className="col-sm-2">
					<input 
						className="form-control"
						id="vehicleModel"
						type="text" 
						ref="vehicleModel"
						defaultValue={vehicle.vehicleModel}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="vehicleModelYear">Model Year:</label>
					<div className="col-sm-2">
					<input 
						className="form-control"
						id="vehicleModelYear"
						type="number" 
						ref="vehicleModelYear"
						placeholder="Model Year"
						defaultValue={vehicle.vehicleModelYear}
					/>
					</div>
					
					</div>
					
					<div className="form-group">
					
					<label className="control-label col-sm-2" htmlFor="licensePlate">License Plate:</label>
					<div className="col-sm-2">
					<input 
						className="form-control"
						id="licensePlate"
						type="text" 
						ref="licensePlate"
						defaultValue={vehicle.licensePlate}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="vehicleColor">Color:</label>
					<div className="col-sm-2">
					<input
						className="form-control"
						id="vehicleColor"
						type="text"
						ref="vehicleColor"
						defaultValue={vehicle.color}
					/>
					</div>

					<label className="control-label col-sm-1" htmlFor="driver">Driver:</label>
					<div className="col-sm-3">
					<select
						className="form-control"
						id="driver"
						ref="driver"
						defaultValue={vehicle.driver}
					>
						{this.employees().map( (employee) => {
							return <option
										key={employee._id}
										value={employee.employeeId}
									>
									{employee.employeeFirstName}
									</option>
						})}
					</select>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="initialMileage">Mileage:</label>
					<div className="col-sm-2">
					<input
						className="form-control"
						id="initialMileage"
						type="number"
						ref="initialMileage"
						defaultValue={vehicle.initialMileage}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="description">Description:</label>
					<div className="col-sm-5">
					<input 
						className="form-control"
						id="description"
						type="text" 
						ref="description"
						defaultValue={vehicle.description}
					/>
					</div>
					<label className="control-label col-sm-2" htmlFor="lastOil">Last Oil Change:</label>
					<div className="col-sm-3">
					<input 
						type="date" 
						className="form-control"
						id="lastOil"
						ref="lastOil"
						defaultValue={this.date('o')}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="repairHist">Repair History:</label>
					<div className="col-sm-5">
					<textarea 
						className="form-control"
						id="repairHist"
						cols="40" rows="5" 
						ref="repairHist"
						defaultValue={vehicle.repairHist}
					/>
					
					</div>
					<label className="control-label col-sm-2" htmlFor="nextOil">Next Oil Change:</label>
					<div className="col-sm-3">
					<input 
						type="date" 
						className="form-control"
						id="nextOil"
						ref="nextOil"
						defaultValue={this.date('n')}
					/>
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
				</div>
			</div>
			</div>
			)
	}
}
