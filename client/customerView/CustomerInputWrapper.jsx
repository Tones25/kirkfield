import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GetContainerDimensions from 'react-dimensions'

import CustomerForm from './CustomerForm.jsx';
import DataTable from './../DataTable.jsx';

export const Customers = new Mongo.Collection("customers");

export default class CustomerInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				customers: Meteor.subscribe("allCustomers")
			},
		};
	}

	componentWillUnmount() {
		this.state.subscription.customers.stop();
	}

	customers() {
		return Customers.find().fetch();
	}
	
	recent() {
		return Customers.find();
	}
	
	render() {
		this.state.recent = this.customers();
		let tableRowHeight = 50;
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>New Customer</h1>
				</div>
				<div className="panel-body">
					<CustomerForm />
				</div>
				</div>
				
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Recently Added Customers</h1>
				</div>
				<div className="panel-body">
					<DataTable 
						rowHeight={tableRowHeight}
						columns={['customerId', 'contactName', 'address', 'phone1']}
						columnNames={['Customer Id#', 'Name', 'Address', 'Phone#']}
						deleteButtons={true}
						deleteFunction={'deleteCustomer'}
						editButtons={true}
						editFunction={ function(route) {FlowRouter.go("/customer/" + route._id);} }
						data={this.customers()}
					/>
				</div>
				</div>
			</div>
		)
	}
}

