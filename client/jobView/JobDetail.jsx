import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Inventory} from './../inventoryView/InventoryInputWrapper.jsx';
import {Employees} from './../employeeView/EmployeeInputWrapper.jsx';
import {Customers} from './../customerView/CustomerInputWrapper.jsx';
import {Vehicles} from './../vehicleView/VehicleInputWrapper.jsx';
import {Jobs} from './../jobView/JobInputWrapper.jsx';

import SearchBox from './../parameterInputComponents/SearchBox.jsx';

export default class JobDetail extends TrackerReact(Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				inventory: Meteor.subscribe("allInventory"),
				jobs: Meteor.subscribe("allJobs", function() { this.componentWillMount();}.bind(this)),
				employees: Meteor.subscribe("allEmployees"),
				customers: Meteor.subscribe("allCustomers"),
				vehicles: Meteor.subscribe("allVehicles")
			},
			customer: 0,
			estEmp: 0,
			insEmp: 0,
			vehId: 0,
			installItems: []
		};
		this.changeCustomer = this.changeCustomer.bind(this);
		this.changeInstallItem = this.changeInstallItem.bind(this);
		this.changeInstallItemQuantity = this.changeInstallItemQuantity.bind(this);
		this.changeEstEmp = this.changeEstEmp.bind(this);
		this.changeInsEmp = this.changeInsEmp.bind(this);
		this.changeVehicle = this.changeVehicle.bind(this);
	}

	componentWillMount() {
		let job = this.job();
		if (!job) {
			console.log(job);
			return;
		}
		let installations = job.installations;
    	let customer = job.customer;
    	let estEmp = job.estimateEmployee;
    	let insEmp = job.installEmployee;
    	let vehId = job.vehicleId;
		if (installations.length > 0) {
			this.setState({installItems: installations,
                    customer: customer,
                    estEmp: estEmp,
                	insEmp: insEmp,
                	vehId: vehId});
			document.getElementById('installItem0').value=installations[0].item;
		}
	}
	
	componentWillUnmount() {
		this.state.subscription.inventory.stop();
		this.state.subscription.jobs.stop();
		this.state.subscription.employees.stop();
		this.state.subscription.customers.stop();
		this.state.subscription.vehicles.stop();
	}

	inventoryItems() {
		return Inventory.find().fetch();
	}

	customers() {
		return Customers.find().fetch();
	}

	job() {
		return Jobs.findOne(this.props.id);
	}

	date() {
		let job = this.job();
		newDate = new Date(parseInt(job.date.getFullYear()), parseInt(job.date.getMonth()), parseInt(job.date.getDate()));
		return newDate.toISOString().substr(0,10);
	}
	
	employees() {
		return Employees.find().fetch();
	}
	
	vehicles() {
		return Vehicles.find().fetch();
	}
	
	addInstallItem() {

		this.setState(function(prevState, props) {
			let newInstallItems = prevState.installItems
			newInstallItems.push({key: 'installItem' + newInstallItems.length});
			return {
				installItems: newInstallItems
			};
		});
	}

	changeCustomer(customer) {
		this.setState({customer: customer.value});
		console.log(this.state.customer);
	}

	changeEstEmp(employee) {
		this.setState({estEmp: employee.value})		
	}

	changeInsEmp(employee) {
		this.setState({insEmp: employee.value})	
	}

	changeVehicle(vehicle) {
		this.setState({vehId: vehicle.value})	
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
	
	editJob(event) {
		event.preventDefault();
    	let complete = this.refs.complete.checked;
		let date = this.refs.date.value.trim();
		let customer = this.state.customer;
		let jobTypeCode = this.refs.jobTypeCode.value.trim();
		let estimateCost = this.refs.estimateCost.value.trim();
		let estimateEmployee = this.refs.estimateEmployee.value.trim();
		let installCost = this.refs.installCost.value.trim();
		let installEmployee = this.refs.installEmployee.value.trim();
		let vehicleId = this.refs.vehicleId.value.trim();
		let mileage = this.refs.mileage.value.trim();
    	let comments = this.refs.comments.value.trim();
		let tempCounter = 0;
		//Create array of installItem Ids
        var installations = [];
		installations = this.state.installItems;
		
		//add further input validation rules here
		if(this.job()) {
			Meteor.call('editJobItem', this.job(), complete, date, customer,
			  jobTypeCode, estimateCost, estimateEmployee, installCost,
		      installations, installEmployee, vehicleId, mileage, comments, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
				Bert.alert('Successfully updated Job#' + this.job().invoice, 'success', 'fixed-top', 'fa-smile-o');
			}
		});
		}

		
	}

	back() {
		FlowRouter.go("/jobInput");
	}
	
	render() {
		let job = this.job();

		if (!job) {
			return (<div>Loading...</div>)
		}
		return(
			<div className="row">				
				
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Invoice Number {job.invoice}</h1>
				</div>
				<div className="panel-body">
				<form className="form-horizontal" onSubmit={this.editJob.bind(this)}>
				<div className="well well-sm">
				<h3>Job</h3>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="date">Date:</label>
					<div className="col-sm-4">
					<input 
						type="date" 
						className="form-control"
						id="date"
						ref="date"
						defaultValue={this.date()}
					/>
					</div>
				
					<label className="control-label col-sm-2" htmlFor="jobTypeCode">Job Type Code:</label>
					<div className="col-sm-3">
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
					</div>
					<div className="form-group">
			          <label className="control-label col-sm-2" htmlFor="complete">Completed:</label>
			          <div className="col-sm-4">
			          <input 
			            className="form-control"
			            id="complete"
			            type="checkbox" 
			            ref="complete"
			            defaultChecked={job.complete}
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
							defaultValue={job.customer}
							placeholder={"Placeholder"}
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
						defaultValue={job.estimateCost}
					/>
					</div>
					
					<label className="control-label col-sm-3" htmlFor="estimateEmployee">Estimate Employee:</label>
					<div className="col-sm-4">

					<select
						className="form-control"
						id="estimateEmployee"
						ref="estimateEmployee"
						value={this.state.estEmp}
						onChange={this.changeEstEmp.bind(this)}
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
						defaultValue={job.installCost}
					/>
					</div>
					
					<label className="control-label col-sm-3" htmlFor="installEmployee">Install Employee:</label>
					<div className="col-sm-3">
					<select
						className="form-control"
						id="installEmployee"
						ref="installEmployee"
						value={this.state.insEmp}
						onChange={this.changeInsEmp.bind(this)}
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
						//console.log(formElementId.substr(11,12));
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
											defaultValue={this.state.installItems[parseInt(formElementId.substr(11,12))].item}
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
											defaultValue={this.state.installItems[parseInt(formElementId.substr(11,12))].quantity}
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
				
				<div className="well">
				<h3>Vehicle</h3>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleId">Vehicle Id:</label>
					<div className="col-sm-4">
					<select 
						className="form-control"
						id="vehicleId"
						ref="vehicleId"
						value={this.state.vehId}
						onChange={this.changeVehicle.bind(this)}
					>
						{this.vehicles().map( (vehicles) => {
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
						defaultValue={job.mileage}
					/>
					</div>
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
			            defaultValue={job.comments}
			          />
			          
			          </div>
			          </div>
					
					<div className="col-sm-10">
						<a className="btn btn-primary pull-right" href="/jobInput">
							Back to Jobs<span className="glyphicon glyphicon-return"></span>
						</a>
					</div>
					<div className="col-sm-2">
					<input type="submit" className="btn btn-primary" value="Save changes"/>
					</div>
				</form>
				</div>
			</div>
			</div>
			
			)
	}
}
