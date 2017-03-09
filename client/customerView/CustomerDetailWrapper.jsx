import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Customers} from './CustomerInputWrapper';
import CustomerDetail from './CustomerDetail';


export default class CustomerDetailWrapper extends TrackerReact(Component) {

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

	customer() {
		return Customers.findOne(this.props.id);
	}

	back() {
		FlowRouter.go("/customers");
	}

	render() {
		let customer = this.customer();

		if(!customer) {
			return(<div>Loading...</div>)
		}
		return(
			<div>			
				<button className="btn btn-primary" onClick={this.back.bind(this)}>
						Back to Customers<span className="glyphicon glyphicon-return"></span>
				</button>
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>{customer.contactName}&emsp;(Customer#{customer.customerId})</h1>
				</div>
				<div className="panel-body">
					<CustomerDetail  id={this.props.id}/>
				</div>
			</div>
			</div>
			)
	}
}
