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
			search: ""
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentWillUnmount() {
		this.state.subscription.customers.stop();
	}

	handleSearchChange() {
		let search = document.getElementById("search").value;
		this.setState({
			search: search,
		});
	}

	customers() {
		return Customers.find(
			{$or:[
			{contactName:{
			$regex: this.state.search, "$options": "i",
			}},
			{address:{
			$regex: this.state.search, "$options": "i",
			}},
			{billableOwner:{
			$regex: this.state.search, "$options": "i",
			}},
			{billableAddress:{
			$regex: this.state.search, "$options": "i",
			}}]},
			{sort: {nextService: 1}}
		).fetch();
	}
	
	top() {
		var id = Customers.findOne(
			{},
			{sort: {customerId: -1},
			limit: 1}
		);
		//id++;
		if (id != undefined) {
			//document.getElementById("customerform").componentShouldUpdate();
			return parseInt(id.customerId);
		}
		else {
			return 72;
		}
		console.log(id);
		//return parseInt(id.customerId);
		//return 16;
	}
	
	render() {
		if (!Meteor.userId()) {
			return (<h1>You must be logged in.</h1>)
		}
		this.state.recent = this.customers();
		let tableRowHeight = 50;
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>New Customer</h1>
				</div>
				<div className="panel-body">
					<CustomerForm
						id="customerform"
						newId={this.top()}
					/>
				</div>
				</div>
				
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Customer Listing</h1>
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

