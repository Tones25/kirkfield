import React, {Component} from 'react';
import {Vehicles} from './VehicleInputWrapper';
import {Employees} from './../employeeView/EmployeeInputWrapper';

export default class VehicleForm extends Component {
	constructor() {
		super();
		this.state = {
			subscription: {
				employees: Meteor.subscribe("allEmployees")
			}
		};
	}
	
	componentWillUnmount() {
		this.state.subscription.employees.stop();
	}


	employees() {
		return Employees.find().fetch();
	}

	addVehicle(event) {
		event.preventDefault();
		let vehicleId = this.refs.vehicleId.value.trim();
		let vehicleMake = this.refs.vehicleMake.value.trim();
		let vehicleModel = this.refs.vehicleModel.value.trim();
		let vehicleModelYear = this.refs.vehicleModelYear.value.trim();
		console.log(this.refs.licensePlate.value.trim());
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
		if(vehicleId) {
			if (!parseInt(vehicleId)) {
				Bert.alert('id must be a number', 'danger', 'fixed-top', 'fa-frown-o');
				validInput = false;
			}
			if (vehicleModelYear < 0) {
				Bert.alert('year can\'t be negative', 'danger', 'fixed-top', 'fa-frown-o');
				validInput = false;
			}
		if (validInput) {
			Meteor.call('addVehicle', vehicleId, vehicleMake,
				vehicleModel, vehicleModelYear, licensePlate, 
				color, driver, initialMileage, 
				repairHist, description, lastOil, nextOil, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
				Bert.alert('Successfully added Item: ' + vehicleModelYear + " " + vehicleMake + " " + vehicleModel, 'success', 'fixed-top', 'fa-smile-o');

			this.refs.vehicleId.value = parseInt(vehicleId) + 1;
			this.refs.vehicleMake.value = "";
			this.refs.vehicleModel.value = "";
			this.refs.vehicleModelYear.value = "";
			this.refs.licensePlate.value = "";
			this.refs.color.value = "";
			this.refs.driver.value = "";
			this.refs.initialMileage.value = 50000;
			this.refs.licensePlate.value = "";
			this.refs.description.value = "";
			this.refs.repairHist.value = "";
			this.refs.lastOil.value = "";
			this.refs.nextOil.value = "";
			}
		});
		}}
	}
	
	render() {
		var id = Vehicles.findOne(
			{},
			{sort: {vehicleId: -1},
			limit: 1}
		);
		if (id == undefined) {
			return <div>Loading...</div>
		}
		return(
			
			<form className="form-horizontal" onSubmit={this.addVehicle.bind(this)}>
			
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleId">Vehicle Id:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="vehicleId"
						type="text" 
						ref="vehicleId"
						placeholder="Vehicle Id"
						defaultValue={parseInt(id.vehicleId)+1}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="licensePlate">License Plate:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="licensePlate"
						type="text" 
						ref="licensePlate"
						placeholder="License Plate"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleMake">Make:</label>
					<div className="col-sm-2">
					<input 
						className="form-control"
						id="vehicleMake"
						type="text" 
						ref="vehicleMake"
						placeholder="Make"
					/>
					</div>
					
					<label className="control-label col-sm-1" htmlFor="vehicleModel">Model:</label>
					<div className="col-sm-3">
					<input 
						className="form-control"
						id="vehicleModel"
						type="text" 
						ref="vehicleModel"
						placeholder="Model"
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
						defaultValue={new Date().getFullYear()}
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleColor">Color:</label>
					<div className="col-sm-2">
					<input
						className="form-control"
						id="vehicleColor"
						type="text"
						ref="vehicleColor"
						placeholder="Color"
					/>
					</div>

					<label className="control-label col-sm-1" htmlFor="driver">Driver:</label>
					<div className="col-sm-3">
					<select
						className="form-control"
						id="driver"
						ref="driver"
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
						defaultValue={50000}
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
						placeholder="Description"
					/>
					</div>
					<label className="control-label col-sm-2" htmlFor="lastOil">Last Oil Change:</label>
					<div className="col-sm-3">
					<input 
						type="date" 
						className="form-control"
						id="lastOil"
						ref="lastOil"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="repairHist">Repair History:</label>
					<div className="col-sm-5">
					<textarea 
						className="form-control"
						style={{resize: 'none'}}
						id="repairHist"
						cols="40" rows="5" 
						ref="repairHist"
						placeholder="Repair History"
					/>
					
					</div>
					<label className="control-label col-sm-2" htmlFor="nextOil">Next Oil Change:</label>
					<div className="col-sm-3">
					<input 
						type="date" 
						className="form-control"
						id="nextOil"
						ref="nextOil"
					/>
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)
	}
}
