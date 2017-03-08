import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Inventory} from './../inventoryView/InventoryInputWrapper.jsx';
import {Employees} from './../employeeView/EmployeeInputWrapper.jsx';
import {Vehicles} from './../vehicleView/VehicleInputWrapper.jsx';
import {Jobs} from './../jobView/JobInputWrapper.jsx';

export default class JobDetail extends TrackerReact(Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				inventory: Meteor.subscribe("allInventory"),
				jobs: Meteor.subscribe("allJobs"),
				employees: Meteor.subscribe("allEmployees"),
				vehicles: Meteor.subscribe("allvehicles")
			},
			installItems: [{ key:0}]
		};
	}

	componentDidMount() {
		let job = this.job();
		console.log(job);
		let installations = job.installIds;
		console.log("installIds: " + installations + " installQts: " + job.installQts);
		for (var i=0;i<installations.length-1;i++) {
			this.addInstallItem();
		}
		this.populateInstallItems(installations);
	}
	
	componentWillUnmount() {
		this.state.subscription.inventory.stop();
		this.state.subscription.jobs.stop();
		this.state.subscription.employees.stop();
	}

	inventoryItems() {
		return Inventory.find().fetch();
	}

	job() {
		return Jobs.findOne(this.props.id);
	}

	date() {
		let job = this.job();
		console.log(job.date.getFullYear() + " " + job.date.getMonth() + " " + job.date.getDate());
		/*let dateTokens = job.date.toString().split("-");

		let dateYear = parseInt(dateTokens[0]);
		let dateMonth = parseInt(dateTokens[1]) + 1; //BSON month is 0 based
		let dateDay = parseInt(dateTokens[2]);
		console.log(dateYear + " " + dateMonth + " " + dateDay);*/
		newDate = new Date(parseInt(job.date.getFullYear()), parseInt(job.date.getMonth()), parseInt(job.date.getDate()));
		console.log(newDate);
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
			newInstallItems.push({key: newInstallItems.length});
			//console.log(newInstallItems[0].value);
			return {
				installItems: newInstallItems
			};
		});
	}
	
	editJob(event) {
		event.preventDefault();
		let invoice = this.refs.invoice.value.trim();
		let date = this.refs.date.value.trim();
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
		let tempCounter = 0;
		//Create array of installItem Ids
        var installIds = [];
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
        });

		//add further input validation rules here
		/*if(invoice) {
			Meteor.call('editJobItem', invoice, date, firstName, lastName, address, phoneNumber, email, jobTypeCode,
			estimateCost, estimateParts, estimateEmployee, installCost, installParts, installIds, installQts, installEmployee, vehicleId, mileage, (error, data) => {
			if(error) {
				Bert.alert('Please login before submitting', 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			this.refs.invoice.value = "";
			this.refs.date.value = "";
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
			const installValues = {}; 
			Object.keys(this.refs)
	    	.filter(key => key.substr(0,11) === 'installItem')
	    	.forEach(key => {
	         	ReactDOM.findDOMNode(this.refs[key]).value = "";
	        });
			}
		});
		}*/

		
	}
	
	render() {
		let job = this.job();
		//console.log(vehicles);
		if (!job) {
			return (<div>Loading...</div>)
		}
		return(
			<div className="row">	
			<form method="post" action="/jobInput">				
				<button className="btn btn-primary">
						Back to Jobs<span className="glyphicon glyphicon-return"></span>
				</button>
			</form>
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
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="firstName">First Name:</label>
					<div className="col-sm-4">
					<input 
						type="text" 
						className="form-control"
						id="firstName"
						ref="firstName"
						defaultValue={job.firstName}
					/>
					</div>
				
					<label className="control-label col-sm-2" htmlFor="lastName">Last Name:</label>
					<div className="col-sm-4">
					<input 
						type="text" 
						className="form-control"
						id="lastName"
						ref="lastName"
						defaultValue={job.lastName}
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
						defaultValue={job.address}
					/>
					</div>
				</div>
				
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="phoneNumber">Phone Number:</label>
					<div className="col-sm-4">
					<input 
						type="text"
						className="form-control"
						id="phoneNumber"
						ref="phoneNumber"
						defaultValue={job.phoneNumber}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="email">Email Address:</label>
					<div className="col-sm-4">
					<input 
						type="text" 
						className="form-control"
						id="email"
						ref="email"
						defaultValue={job.email}
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
					
					{this.state.installItems.map( (installItem) => {
					
						let formElementId = 'installItem' + installItem.key;
						return 	<div className="form-group" key={formElementId}>
									<label className="control-label col-sm-2" htmlFor={formElementId + 'name'}>Install Item:</label>
									<div className="col-sm-2">
										<input 
											list={formElementId + 'name'}
											ref={formElementId}
											className="form-control"
											placeholder="Install Item"
										/>
										<datalist id={formElementId + 'name'}>
											{this.inventoryItems().map( (item) => {
												return <option
															key={item._id}
															value={item.inventoryItemName + "-#" + item.inventoryItemId} />
											})}
										</datalist>
									</div>
									
									<label 
										className="control-label col-sm-3"
										htmlFor={formElementId + 'quantity'}>
										Install Item Quantity:
									</label>
									<div className="col-sm-3">
										<input
											type="number"
											className="form-control"
											id={formElementId + 'quantity'}
											ref={formElementId + 'quantity'}
											placeholder='1'
										/>
									</div>
								</div>
					})}

					
					
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
