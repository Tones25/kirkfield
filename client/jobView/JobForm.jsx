import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Inventory} from './../inventoryView/InventoryInputWrapper.jsx';
import {Employees} from './../employeeView/EmployeeInputWrapper.jsx';
import {Customers} from './../customerView/CustomerInputWrapper.jsx';
import {Vehicles} from './../vehicleView/VehicleInputWrapper.jsx';
import {Jobs} from './JobInputWrapper.jsx';

import SearchBox from './../parameterInputComponents/SearchBox.jsx';

export default class JobForm extends Component {

	constructor() {
		super();
		this.state = {
			subscription: {
				inventory: Meteor.subscribe("allInventory"),
				employees: Meteor.subscribe("allEmployees"),
				customers: Meteor.subscribe("allCustomers"),
				jobs: Meteor.subscribe("allJobs"),
				vehicles: Meteor.subscribe("allVehicles")
			},
			customer: 0,
			installItems: [{key:'installItem' + 0, quantity: 1}]
		};
		
		this.changeCustomer = this.changeCustomer.bind(this);
		this.changeInstallItem = this.changeInstallItem.bind(this);
		this.changeInstallItemQuantity = this.changeInstallItemQuantity.bind(this);
		this.inventoryItems = this.inventoryItems.bind(this);
	}
	
	componentWillUnmount() {
		this.state.subscription.inventory.stop();
		this.state.subscription.employees.stop();
		this.state.subscription.customers.stop();
		this.state.subscription.jobs.stop();
		this.state.subscription.vehicles.stop();
	}

	inventoryItems() {
		return Inventory.find().fetch();
	}
	
	employees() {
		return Employees.find().fetch();
	}
	
	customers() {
		return Customers.find().fetch();
	}

	changeCustomer(customer) {
		this.setState({customer: customer.value});
		console.log(this.state.customer);
	}
	
	addInstallItem() {

		this.setState(function(prevState, props) {
			let newInstallItems = prevState.installItems
			newInstallItems.push({key: 'installItem' + newInstallItems.length});
			//console.log(newInstallItems[0].value);
			return {
				installItems: newInstallItems
			};
		});
	}
	changeInstallItem(item) {
		
		this.setState(function(prevState, props) {
			let newInstallItems = [];
			prevState.installItems.map(
				function(i) {
					if (i.key === item.list.id) {
						this.push({key: i.key, item: item.value, quantity: i.quantity});
					} else {
						this.push(i);
					}
				}
			, newInstallItems);
			return {installItems: newInstallItems};
		});
	}

	changeInstallItemQuantity(event) {
	
		let id = event.target.id;
		let value = event.target.value;
		this.setState(function(prevState, props) {
			let newInstallItems = [];
			prevState.installItems.map( 
				function(i) {
					if (i.key + 'quantity' === id) {
						this.push({key: i.key, item: i.item, quantity: value});
					} else {
						this.push(i);
					}
				}
			, newInstallItems);
			return {installItems: newInstallItems};
		});
	}
	
	addJob(event) {
		event.preventDefault();
		let invoice = this.refs.invoice.value.trim();
		let complete = this.refs.complete.checked;
		let date = this.refs.date.value.trim();
		let customer = this.state.customer;
		let jobTypeCode = this.refs.jobTypeCode.value.trim();
		let estimateCost = this.refs.estimateCost.value.trim();
		let estimateEmployee = this.refs.estimateEmployee.value.trim();
		console.log(estimateEmployee);
		let installCost = this.refs.installCost.value.trim();
		let installEmployee = this.refs.installEmployee.value.trim();
		let vehicleId = this.refs.vehicleId.value.trim();
		let mileage = this.refs.mileage.value.trim();
		let comments = this.refs.comments.value.trim();
		let tempCounter = 0;
		//Create array of installItem Ids
        var installations = [];
		//var installQts = [];
		installations = this.state.installItems;

		//add further input validation rules here
		if(invoice) {
			Meteor.call('addJob', invoice, complete, date, customer, 
				jobTypeCode, estimateCost, estimateEmployee, installCost,
				installations, installEmployee, vehicleId, mileage, comments, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			Bert.alert('Successfully added Job#' + invoice, 'success', 'fixed-top', 'fa-smile-o');
			this.refs.invoice.value = parseInt(invoice) + 1;
			this.refs.date.value = "";
			document.getElementById("selCust").value == "";
			this.refs.jobTypeCode.value = "";
			this.refs.estimateCost.value = "";
			this.refs.estimateEmployee.value = "";
			this.refs.installCost.value = "";
			this.refs.installEmployee.value = "";
			this.refs.vehicleId.value = "";
			this.refs.mileage.value = "";
			this.refs.comments.value = "";
			const installValues = {}; 
			Object.keys(this.refs)
	    	.filter(key => key.substr(0,11) === 'installItem')
	    	.forEach(key => {
	         	ReactDOM.findDOMNode(this.refs[key]).value = "";
	        });
			}
		});
		}
		//document.getElementById("cForm").addCustomer();
		
	}
	
	render() {
		newId = Jobs.findOne(
			{},
			{sort: {invoice: -1},
			limit: 1}
		);
		let vehicles = this.props.vehicles;
		//console.log(vehicles);
		if (!newId) {
			return (<div>Loading...</div>);
		}
		return(
			<form className="form-horizontal" onSubmit={this.addJob.bind(this)}>
			<div className="well">
				<h3>Job</h3>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="invoiceNumber">Invoice Number:</label>
					<div className="col-sm-4">
					<input 
						type="number" 
						className="form-control"
						id="invoiceNumber"
						ref="invoice"
						defaultValue={parseInt(newId.invoice) + 1}
						placeholder="Invoice"
					/>
					</div>
				
					<label className="control-label col-sm-2" htmlFor="date">Date:</label>
					<div className="col-sm-4">

					<input 
						type="date" 
						className="form-control"
						id="date"
						ref="date"
						placeholder="Date"
					/>
					</div>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="jobTypeCode">Job Type Code:</label>
					<div className="col-sm-4">
					<select
						className="form-control"
						id="jobTypeCode"
						ref="jobTypeCode"
						>
							<option value="a">a</option>
							<option value="b">b</option>
							<option value="c">c</option>
						
					</select>
					</div>

					<label className="control-label col-sm-2" htmlFor="complete">Completed:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="complete"
						type="checkbox" 
						ref="complete"
					/>
					</div>
				</div>
			</div>	
				<div className="well">
				<h3>Customer</h3>
				<div className="form-group" key="selCust">
					<label className="control-label col-sm-2" htmlFor="selCust">Select Customer:</label>
					<div className="col-sm-4">
						<SearchBox
							options={this.customers()}
							onSelectionChange={this.changeCustomer}
							inputElementListAttribute="selCust"
							inputElementRefAttribute="selCust"
							datalistElementIdAttribute="selCust"
							datalistElementKey={'customerId'}
							datalistElementValue={'contactName'}
							placeholder={"Customer Id Number"}
						/>
						
					</div>
					</div>
				</div>
			<div className="well">
				<h3>Estimate</h3>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="estimateCost">Estimate Cost:</label>
					<div className="col-sm-3">
					<input 
						type="number"
						step="0.01"
						className="form-control"
						id="estimateCost"
						ref="estimateCost"
						placeholder="Estimate Cost"
					/>
					</div>
					
					<label className="control-label col-sm-3" htmlFor="estimateEmployee">Estimate Employee:</label>
					<div className="col-sm-4">
					<select
						className="form-control"
						id="estimateEmployee"
						ref="estimateEmployee"
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
				</div>
			</div>	
				<div className="well">
				<h3>Install</h3>
				
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="installCost">Install Cost:</label>
					<div className="col-sm-3">
					<input 
						type="number"
						step="0.01"
						className="form-control"
						id="installCost"
						ref="installCost"
						placeholder="Install Cost"
					/>
					</div>
					
					<label className="control-label col-sm-3" htmlFor="installEmployee">Install Employee:</label>
					<div className="col-sm-3">
					<select
						className="form-control"
						id="installEmployee"
						ref="installEmployee"
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
					</div>
					
					{this.state.installItems.map( function(installItem) {
						let formElementId = installItem.key;
						return 	<div className="form-group" key={formElementId}>
									<label className="control-label col-sm-2" htmlFor={formElementId + 'name'}>Install Item:</label>
									<div className="col-sm-3">
										<SearchBox
											options={this.inventoryItems()}
											onSelectionChange={this.changeInstallItem}
											inputElementListAttribute={formElementId}
											inputElementRefAttribute={formElementId}
											datalistElementIdAttribute={formElementId}
											datalistElementKey={'inventoryItemId'}
											datalistElementValue={'inventoryItemName'}
											placeholder={"Placeholder"}
										/>
										
									</div>
									
									<label 
										className="control-label col-sm-3"
										htmlFor={formElementId + 'quantity'}>
										Install Item Quantity:
									</label>
									<div className="col-sm-2">
										<input
											onChange={this.changeInstallItemQuantity}
											type="number"
											className="form-control"
											id={formElementId + 'quantity'}
											ref={formElementId + 'quantity'}
											placeholder='1'
										/>
									</div>
								</div>;
					}, this)}
					
					<button className="btn btn-primary"
						type="button"
						onClick={this.addInstallItem.bind(this)}>
						Add Install Item <span className="glyphicon glyphicon-plus-sign"></span>
					</button>

				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleId">Vehicle Id:</label>
					<div className="col-sm-4">
					<select 
						className="form-control"
						id="vehicleId"
						ref="vehicleId"
					>
						{vehicles.map( (vehicles) => {
							return <option 
										key={vehicles._id} 
										value={vehicles.vehicleId}
										>
										{vehicles.vehicleModelYear + ' ' + vehicles.vehicleMake + ' ' + vehicles.vehicleModel}
									</option>
						})}
			
					</select>
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
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="comments">Additional Comments:</label>
					<div className="col-sm-5">
					<textarea 
						className="form-control"
						style={{resize: 'none'}}
						id="comments"
						cols="40" rows="5" 
						ref="comments"
						placeholder="Write something here."
					/>
					
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)
	}
}