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
				jobs: Meteor.subscribe("allJobs"),
				employees: Meteor.subscribe("allEmployees"),
				customers: Meteor.subscribe("allCustomers"),
				vehicles: Meteor.subscribe("allvehicles")
			},
			customer: 0,
			installItems: [{key:'installItem' + 0, quantity: 1}]
		};
		this.changeCustomer = this.changeCustomer.bind(this);
		this.changeInstallItem = this.changeInstallItem.bind(this);
		this.changeInstallItemQuantity = this.changeInstallItemQuantity.bind(this);
	}

	componentDidMount() {
		let job = this.job();
		console.log(job);
		let installations = job.installations;
		//this.setState(installitems)
		//console.log("installIds: " + installations.item + " installQts: " + installations.quantity);
		for (var i=0;i<installations.length-1;i++) {
			this.addInstallItem();
		}
		this.setState({installItems: installations})
		console.log(this.state.installItems);
		document.getElementById('installItem0').value=installations[0].item;
		//this.populateInstallItems(installations);
	}
	
	componentWillUnmount() {
		this.state.subscription.inventory.stop();
		this.state.subscription.jobs.stop();
		this.state.subscription.employees.stop();
		this.state.subscription.customers.stop();
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
		//console.log(job.date.getFullYear() + " " + job.date.getMonth() + " " + job.date.getDate());
		/*let dateTokens = job.date.toString().split("-");

		let dateYear = parseInt(dateTokens[0]);
		let dateMonth = parseInt(dateTokens[1]) + 1; //BSON month is 0 based
		let dateDay = parseInt(dateTokens[2]);
		console.log(dateYear + " " + dateMonth + " " + dateDay);*/
		newDate = new Date(parseInt(job.date.getFullYear()), parseInt(job.date.getMonth()), parseInt(job.date.getDate()));
		//console.log(newDate);
		return newDate.toISOString().substr(0,10);
	}

	populateInstallItems(installations) {
		Object.keys(this.refs)
    	.filter(key => key.substr(0,11) === 'installItem')
    	.filter(key => key.length == 12)
    	.forEach(key => {
    		console.log(key.substr(11));
         	ReactDOM.findDOMNode(this.refs[key]).value = installations[parseInt(key.substr(11))];
        });
	}
	
	employees() {
		return Employees.find().fetch();
	}
	
	vehicles() {
		return Vehicles.find().fetch();
	}
	
	addInstallItem() {

		/*itemList += item._id + ",";
		console.log(itemList);	*/
		this.setState(function(prevState, props) {
			let newInstallItems = prevState.installItems
			newInstallItems.push({key: 'installItem' + newInstallItems.length});
			//console.log(newInstallItems[0].value);
			return {
				installItems: newInstallItems
			};
		});
	}

	changeCustomer(customer) {
		//console.output(document.getElementById("selCust").value);
		this.setState({customer: customer.value});
		console.log(this.state.customer);
	}
	
	changeInstallItem(item) {
		
		this.setState(function(prevState, props) {
			let newInstallItems = [];
			prevState.installItems.map(
				function(i) {
					console.log(item);
					console.log(item.list.id);
					console.log(i.key);
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
		let date = this.refs.date.value.trim();
		let customer = this.state.customer;
		let jobTypeCode = this.refs.jobTypeCode.value.trim();
		let estimateCost = this.refs.estimateCost.value.trim();
		let estimateParts = this.refs.estimateParts.value.trim();
		let estimateEmployee = this.refs.estimateEmployee.value.trim();
		let installCost = this.refs.installCost.value.trim();
		let installParts = this.refs.installParts.value.trim();
		let installEmployee = this.refs.installEmployee.value.trim();
		let vehicleId = this.refs.vehicleId.value.trim();
		let mileage = this.refs.mileage.value.trim();
		let tempCounter = 0;
		//Create array of installItem Ids
        var installations = [];
		installations = this.state.installItems;
		console.log(installations);
        /*var installIds = [];
        const itemIds = {};
		Object.keys(this.refs)
    	.filter(key => key.substr(0,11) === 'installItem')
    	.filter(key => key.length == 12)
    	.forEach(key => {
         	itemIds[key] = ReactDOM.findDOMNode(this.refs[key]).value || null;
         	if (itemIds[key]!=null) {
         	itemIds[key] = itemIds[key].split("#")[1];
         	installIds[parseInt(key.substr(11))] = itemIds[key];
         }
        });
		//Create array of installItem Quantities
		var installQts = [];
		const itemQts = {}; 
		Object.keys(this.refs)
    	.filter(key => key.substr(0,11) === 'installItem')
    	.filter(key => key.substr(12) === 'quantity')
    	.forEach(key => {
         	itemQts[key] = ReactDOM.findDOMNode(this.refs[key]).value || null;
         	if (itemQts[key]!=null) {
         	//console.log(itemQts[key]);
         	installQts[parseInt(key.substr(11))] = itemQts[key];
         }
        });*/

		//add further input validation rules here
		if(this.job()) {
			Meteor.call('editJobItem', this.job(), date, customer, jobTypeCode,
			estimateCost, estimateParts, estimateEmployee, installCost, installParts, installations, installEmployee, vehicleId, mileage, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			Bert.alert('Successfully updated Job#' + invoice, 'success', 'fixed-top', 'fa-smile-o');
			this.refs.date.value = "";
			document.getElementById("selCust").value == "";
			this.refs.jobTypeCode.value = "";
			this.refs.estimateCost.value = "";
			this.refs.estimateParts.value = "";
			this.refs.estimateEmployee.value = "";
			this.refs.installCost.value = "";
			this.refs.installParts.value = "";
			this.refs.installEmployee.value = "";
			this.refs.vehicleId.value = "";
			this.refs.mileage.value = "";
			const installValues = {}; 
			Object.keys(this.refs)
	    	.filter(key => key.substr(0,11) === 'installItem')
	    	.forEach(key => {
	         	ReactDOM.findDOMNode(this.refs[key]).value = "";
	        });
			}
		});
		}

		
	}

	back() {
		FlowRouter.go("/jobInput");
	}
	
	render() {
		let job = this.job();
		console.log(this.state.installItems);
		//console.log(vehicles);
		if (!job) {
			return (<div>Loading...</div>)
		}
		return(
			<div className="row">				
				<button className="btn btn-primary" onClick={this.back.bind(this)}>
						Back to Jobs<span className="glyphicon glyphicon-return"></span>
				</button>
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Invoice #{job.invoice}</h1>
				</div>
				<div className="panel-body">
					<form className="form-horizontal" onSubmit={this.editJob.bind(this)}>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="invoiceNumber">Date:</label>
					<div className="col-sm-10">
					<input 
						type="date" 
						className="form-control"
						id="date"
						ref="date"
						defaultValue={this.date()}
					/>
					</div>
				</div>
				
				<div className="well well-sm">
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
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="jobTypeCode">Job Type Code:</label>
					<div className="col-sm-4">
					<input 
						type="text"
						className="form-control"
						id="jobTypeCode"
						ref="jobTypeCode"
						defaultValue={job.jobTypeCode}
					/>
					</div>
				</div>
				
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="estimateCost">Estimate Cost:</label>
					<div className="col-sm-2">
					<input 
						type="number"
						step="0.01"
						className="form-control"
						id="estimateCost"
						ref="estimateCost"
						defaultValue={job.estimateCost}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="estimateParts">Estimate Parts:</label>
					<div className="col-sm-2">
					<input 
						type="text"
						className="form-control"
						id="estimateParts"
						ref="estimateParts"
						defaultValue={job.estimateParts}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="estimateEmployee">Estimate Employee:</label>
					<div className="col-sm-2">
					<select
						className="form-control"
						id="estimateEmployee"
						ref="estimateEmployee"
					>
						{this.employees().map( (employee) => {
							return <option
										key={employee._id}
										value={employee.employeeFirstName}
									>
									{employee.employeeFirstName}
									</option>
						})}
					</select>
					</div>
				</div>
				
				<div className="well">
				<h3>Install</h3>
				
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="installCost">Install Cost:</label>
					<div className="col-sm-2">
					<input 
						type="number"
						step="0.01"
						className="form-control"
						id="installCost"
						ref="installCost"
						defaultValue={job.installCost}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="installParts">Install Parts:</label>
					<div className="col-sm-2">
					<input 
						type="text"
						className="form-control"
						id="installParts"
						ref="installParts"
						defaultValue={job.installParts}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="installEmployee">Install Employee:</label>
					<div className="col-sm-2">
					<select
						className="form-control"
						id="installEmployee"
						ref="installEmployee"
					>
						{this.employees().map( (employee) => {
							return <option
										key={employee._id}
										value={employee.employeeFirstName}
									>
									{employee.employeeFirstName}
									</option>
						})}
					</select>
					</div>
					</div>
					
					
					{this.state.installItems.map( function(installItem) {
						let formElementId = installItem.key;
						console.log(formElementId.substr(11,12));
						return 	<div className="form-group" key={formElementId}>
									<label className="control-label col-sm-2" htmlFor={formElementId + 'name'}>Install Item:</label>
									<div className="col-sm-4">
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
										className="control-label col-sm-2"
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
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="vehicleId">Vehicle Id:</label>
					<div className="col-sm-4">
					<select 
						className="form-control"
						id="vehicleId"
						ref="vehicleId"
						defaultValue={job.vehicleId}
					>
						{this.vehicles().map( (vehicles) => {
							return <option 
										key={vehicles._id} 
										value={vehicles.vehicleName} 
										>
										{vehicles.vehicleName}
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
					<input type="submit" className="btn btn-primary pull-right" value="Save changes"/>
				</form>
				</div>
			</div>
			</div>
			
			)
	}
}
