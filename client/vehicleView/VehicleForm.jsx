import React, {Component} from 'react';
export default class VehicleForm extends Component {


	addVehicle(event) {
		event.preventDefault();
		let vehicleId = this.refs.vehicleId.value.trim();
		let vehicleName = this.refs.vehicleName.value.trim();
		let vehicleMake = this.refs.vehicleMake.value.trim();
		let vehicleModel = this.refs.vehicleModel.value.trim();
		let vehicleModelYear = this.refs.vehicleModelYear.value.trim();
		let licensePlate = this.refs.licensePlate.value.trim();
		let color = this.refs.vehicleColor.value.trim();
		let initialMileage = this.refs.initialMileage.value.trim();
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
			Meteor.call('addVehicle', vehicleId, vehicleName, vehicleMake,
				vehicleModel, vehicleModelYear, licensePlate, color, initialMileage, (error, data) => {
			if(error) {
				Bert.alert('Please login before submitting', 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			this.refs.vehicleId.value = "";
			this.refs.vehicleName.value = "";
			this.refs.vehicleMake.value = "";
			this.refs.vehicleModel.value = "";
			this.refs.vehicleModelYear.value = "";
			this.refs.licensePlate = "";
			this.refs.color = "";
			this.refs.initialMileage = 50000;
			this.refs.licensePlate.value = "";
			}
		});
		}}
	}
	
	render() {
		return(
			
			<form className="form-horizontal" onSubmit={this.addVehicle.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleId">Vehicle Id:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="vehicleId"
						type="text" 
						ref="vehicleId"
						placeholder="Vehicle Id"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleName">Vehicle Name:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="vehicleName"
						type="text" 
						ref="vehicleName"
						placeholder="Vehicle Name"
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
					
					<label className="control-label col-sm-2" htmlFor="vehicleModel">Model:</label>
					<div className="col-sm-2">
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
					
					<label className="control-label col-sm-2" htmlFor="licensePlate">License Plate:</label>
					<div className="col-sm-2">
					<input 
						className="form-control"
						id="licensePlate"
						type="text" 
						ref="licensePlate"
						placeholder="License Plate"
					/>
					</div>
					
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
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)
	}
}
