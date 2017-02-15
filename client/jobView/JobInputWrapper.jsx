import React, {Component} from 'react';
import DateInput from './Parameters/DateInput.jsx';
import DateRangeInput from './Parameters/DateRangeInput.jsx';

export default class JobForm extends Component {

	addJob(event) {
		event.preventDefault();
		let invoice = this.refs.invoice.value.trim();
		let firstName = this.refs.firstName.value.trim();
		let lastName = this.refs.lastName.value.trim();
		let address = this.refs.address.value.trim();
		let phoneNumber = this.refs.phoneNumber.value.trim();
		let email = this.refs.email.value.trim();
		let jobTypeCode = this.refs.jobTypeCode.value.trim();
		let estimateCost = this.refs.estimateCost.value.trim();
		let estimateParts = this.refs.estimateParts.value.trim();
		let estimateEmployee = this.refs.estimateEmployee.value.trim();
		let installCost = this.refs.installCost.value.trim();
		let installParts = this.refs.installParts.value.trim();
		let installEmployee = this.refs.installEmployee.value.trim();
		let vehicleId = this.refs.vehicleId.value.trim();
		let mileage = this.refs.mileage.value.trim();
		

		//add further input validation rules here
		if(invoice) {
			Meteor.call('addJob', invoice, firstName, lastName, address, phoneNumber, email, jobTypeCode,
			estimateCost, estimateParts, estimateEmployee, installCost, installParts, installEmployee, vehicleId, mileage, (error, data) => {
			if(error) {
				Bert.alert('Please login before submitting', 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			this.refs.invoice.value = "";
			this.refs.firstName.value = "";
			this.refs.lastName.value = "";
			this.refs.address.value = "";
			this.refs.phoneNumber.value = "";
			this.refs.email.value = "";
			this.refs.jobTypeCode.value = "";
			this.refs.estimateCost.value = "";
			this.refs.estimateParts.value = "";
			this.refs.estimateEmployee.value = "";
			this.refs.installCost.value = "";
			this.refs.installParts.value = "";
			this.refs.installEmployee.value = "";
			this.refs.vehicleId.value = "";
			this.refs.mileage.value = "";
			}
		});
		}

		
	}
	
	render() {
		return(
			<form className="form-horizontal" onSubmit={this.addJob.bind(this)}>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="invoiceNumber">Invoice Number:</label>
					<div className="col-sm-10">
					<input 
						type="number" 
						className="form-control"
						id="invoiceNumber"
						ref="invoice"
						placeholder="Invoice"
					/>
					</div>
					<DateInput/>
					<DateRangeInput/>
				</div>
				
				<div className="well well-sm">
				<h3>Customer</h3>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="firstName">First Name:</label>
					<div className="col-sm-4">
					<input 
						type="text" 
						className="form-control"
						id="firstName"
						ref="firstName"
						placeholder="First Name"
					/>
					</div>
				
					<label className="control-label col-sm-2" htmlFor="lastName">Last Name:</label>
					<div className="col-sm-4">
					<input 
						type="text" 
						className="form-control"
						id="lastName"
						ref="lastName"
						placeholder="Last Name"
					/>
					</div>
				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="address">Address:</label>
					<div className="col-sm-10">
					<input 
						type="text" 
						className="form-control"
						id="address"
						ref="address"
						placeholder="Address"
					/>
					</div>
				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="phoneNumber">Phone Number:</label>
					<div className="col-sm-4">
					<input 
						type="number"
						className="form-control"
						id="phoneNumber"
						ref="phoneNumber"
						placeholder="Phone Number"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="email">Email Address:</label>
					<div className="col-sm-4">
					<input 
						type="text" 
						className="form-control"
						id="email"
						ref="email"
						placeholder="Email"
					/>
					</div>
				</div>
				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="jobTypeCode">Job Type Code:</label>
					<div className="col-sm-4">
					<input 
						type="text"
						className="form-control"
						id="jobTypeCode"
						ref="jobTypeCode"
						placeholder="Job Type Code"
					/>
					</div>
				</div>
				
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="estimateCost">Estimate Cost:</label>
					<div className="col-sm-2">
					<input 
						type="number"
						className="form-control"
						id="estimateCost"
						ref="estimateCost"
						placeholder="Estimate Cost"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="estimateParts">Estimate Parts:</label>
					<div className="col-sm-2">
					<input 
						type="text"
						className="form-control"
						id="estimateParts"
						ref="estimateParts"
						placeholder="Estimate Parts"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="estimateEmployee">Estimate Employee:</label>
					<div className="col-sm-2">
					<input 
						type="text"
						className="form-control"
						id="estimateEmployee"
						ref="estimateEmployee"
						placeholder="Estimate Employee"
					/>
					</div>
				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="installCost">Install Cost:</label>
					<div className="col-sm-2">
					<input 
						type="number"
						className="form-control"
						id="installCost"
						ref="installCost"
						placeholder="Install Cost"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="installParts">Install Parts:</label>
					<div className="col-sm-2">
					<input 
						type="text"
						className="form-control"
						id="installParts"
						ref="installParts"
						placeholder="Install Parts"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="installEmployee">Install Employee:</label>
					<div className="col-sm-2">
					<input 
						type="text"
						className="form-control"
						id="installEmployee"
						ref="installEmployee"
						placeholder="Install Employee"
					/>
					</div>
				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleId">Vehicle Id:</label>
					<div className="col-sm-4">
					<input 
						type="text"
						className="form-control"
						id="vehicleId"
						ref="vehicleId"
						placeholder="Vehicle Id"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="mileage">Mileage:</label>
					<div className="col-sm-4">
					<input 
						type="number"
						className="form-control"
						id="mileage"
						ref="mileage"
						placeholder="Job Mileage"
					/>
					</div>
				</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)
	}
}