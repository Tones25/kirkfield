import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Customers} from './CustomerInputWrapper';
import CustomerDetail from './CustomerDetail';
import LoginForm from '../LoginForm.jsx';



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

	

	render() {
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
		let customer = this.customer();

		if(!customer) {
			return(<div>Loading...</div>)
		}
		return(
		<div className="row">
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Customer Id {customer.customerId}</h1>
				</div>
				<div className="panel-body">
					<CustomerDetail  id={this.props.id}/>
				</div>
			</div>
		</div>
			)
	}
}
