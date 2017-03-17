import React, {Component} from 'react';
import { Match, check } from 'meteor/check';
import {Customers} from './CustomerInputWrapper.jsx';

export default class CustomerForm extends Component {

	addCustomer(event) {
		event.preventDefault();
		let customerId = this.refs.customerId.value.trim();
		let contactName = this.refs.contactName.value.trim();
		let address = this.refs.address.value.trim();
		let billableOwner = this.refs.billableOwner.value.trim();
		let billableAddress = this.refs.billableAddress.value.trim();
		let phone1 = this.refs.phone1.value.trim();
		let phone2 = this.refs.phone2.value.trim();
		let email = this.refs.email.value.trim();
		let qsp = this.refs.qsp.checked;
		console.log(qsp);
		let comments = this.refs.comments.value.trim();
		let nextService = this.refs.nextService.value.trim();
		let validInput = true;
		//add further input validation rules here
		if(customerId) {
			if (!parseInt(customerId)) {
				Bert.alert('id must be a number', 'danger', 'fixed-top', 'fa-frown-o');
				validInput = false;
			}
		if (validInput) {
			Meteor.call('addCustomer', customerId, contactName, address, billableOwner, billableAddress, phone1, phone2, email, qsp, comments, nextService, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			Bert.alert('Successfully added Customer: ' + contactName, 'success', 'fixed-top', 'fa-smile-o');
			this.refs.customerId.value = parseInt(customerId) + 1;
			this.refs.contactName.value = "";
			this.refs.address.value = "";
			this.refs.billableOwner.value = "";
			this.refs.billableAddress.value = "";
			this.refs.phone1.value = "";
			this.refs.phone2.value = "";
			this.refs.email.value = "";
			this.refs.comments.value = "";
			this.refs.nextService.value = "";
			}
		});
		}}

		
	}
	
	render() {
		var id = Customers.findOne(
			{},
			{sort: {customerId: -1},
			limit: 1}
		);
		if (id == undefined) {
			return <div>Loading...</div>
		}
		return(
			
			<form className="form-horizontal" onSubmit={this.addCustomer.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="customerId">Customer Id#:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemId"
						type="number" 
						ref="customerId"
						defaultValue={parseInt(id.customerId) + 1}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="contactName">Contact Name:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="contactName"
						type="text" 
						ref="contactName"
						placeholder="Name"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="address">Address:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="address"
						type="text" 
						ref="address"
						placeholder="Address"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="billableOwner">Billable Owner:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="billableOwner"
						type="text" 
						ref="billableOwner"
						placeholder="Owner Name"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="billableAddress">Billable Address:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="billableAddress"
						type="text" 
						ref="billableAddress"
						placeholder="Address"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="phone1">Home Phone#:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="phone1"
						type="text"
						ref="phone1"
						placeholder="Phone Number"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="phone2">Work Phone#:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="phone2"
						type="text"
						ref="phone2"
						placeholder="Phone Number"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="phone2">Email Address:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="email"
						type="text"
						ref="email"
						placeholder="Email Address"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="qsp">Has Quality Service Plan:</label>
					<div className="col-sm-1">
					<input 
						className="form-control"
						id="qsp"
						type="checkbox" 
						ref="qsp"
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="comments">Additional Comments:</label>
					<div className="col-sm-10">
					<textarea
						className="form-control"
						id="comments"
						cols="40" rows="5" 
						ref="comments"
						placeholder="Type additional information here."
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="nextService">Next Service:</label>
					<div className="col-sm-10">
					<input 
						type="date" 
						className="form-control"
						id="nextService"
						ref="nextService"
					/>
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)			
	}
}
