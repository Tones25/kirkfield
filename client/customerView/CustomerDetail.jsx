import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Customers} from './CustomerInputWrapper'


export default class CustomerDetail extends TrackerReact(Component) {

	constructor() {
		super();

		this.state = {
			subscription: {
				customers: Meteor.subscribe("allCustomers")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.customers.stop();
	}

	editCustomer(event) {
		event.preventDefault();
		let customer = this.customer();
		let contactName = this.refs.contactName.value.trim();
		let address = this.refs.address.value.trim();
		let billableOwner = this.refs.billableOwner.value.trim();
		let billableAddress = this.refs.billableAddress.value.trim();
		let phone1 = this.refs.phone1.value.trim();
		let phone2 = this.refs.phone2.value.trim();
		let qsp = this.refs.qsp.checked;
		let comments = this.refs.comments.value.trim();
		let nextService = this.refs.nextService.value.trim();
		let validInput = true;
		if (validInput) {
			Meteor.call('editCustomer', customer, contactName, address, billableOwner, billableAddress, phone1, phone2, qsp, comments, nextService, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
				Bert.alert('Changes saved', 'success', 'fixed-top', 'fa-smile-o');
			}
		});
		}

		
	}	

	customer() {
		return Customers.findOne(this.props.id);
	}

	date() {
		let customer = this.customer();
		//console.log(customer);
		newDate = new Date(parseInt(customer.nextService.getFullYear()), parseInt(customer.nextService.getMonth()), parseInt(customer.nextService.getDate()));
		return newDate.toISOString().substr(0,10);
	}

	render() {
		let customer = this.customer();

		if(!customer) {
			return(<div>Loading...</div>)
		}
		return(
				<form className="form-horizontal" onSubmit={this.editCustomer.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="contactName">Contact Name:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="contactName"
						type="text" 
						ref="contactName"
						defaultValue={customer.contactName}
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
						defaultValue={customer.address}
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
						defaultValue={customer.billableOwner}
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
						defaultValue={customer.billableAddress}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="phone1">Home Phone#:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="phone1"
						type="tel"
						ref="phone1"
						defaultValue={customer.phone1}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="phone2">Work Phone#:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="phone2"
						type="tel"
						ref="phone2"
						defaultValue={customer.phone2}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="qsp">Has Quality Service Plan:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="qsp"
						type="checkbox" 
						ref="qsp"
						defaultChecked={customer.qsp}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="comments">Additional Comments:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="comments"
						type="textbox"
						ref="comments"
						defaultValue={customer.comments}
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
						defaultValue={this.date()}
					/>
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right" value="Save changes"/>
				</form>
			)
	}
}
