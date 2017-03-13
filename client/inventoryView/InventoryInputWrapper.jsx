import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GetContainerDimensions from 'react-dimensions'

import InventoryForm from './InventoryForm.jsx';
import InventorySingle from './InventorySingle.jsx';
import DataTable from './../DataTable.jsx';

export const Inventory = new Mongo.Collection("inventory");

export default class InventoryInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		this.state = {
			subscription: {
				inventory: Meteor.subscribe("allInventory")
			},
			search: ""
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentWillUnmount() {
		this.state.subscription.inventory.stop();
	}

	handleSearchChange() {
		let search = document.getElementById("search").value;
		this.setState({
			search: search,
		});
	}

	inventoryItems() {
		return Inventory.find(
			{$or:[
			{inventoryItemName:{
			$regex: this.state.search, "$options": "i",
			}},
			{make:{
			$regex: this.state.search, "$options": "i",
			}},
			{model:{
			$regex: this.state.search, "$options": "i",
			}}]}
		).fetch();
	}
	
	recent() {
		return Inventory.find();
	}
	
	render() {
		this.state.recent = this.inventoryItems();
		let tableRowHeight = 50;
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Add Inventory Item</h1>
				</div>
				<div className="panel-body">
					<InventoryForm />
				</div>
				</div>
				
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Inventory Listing</h1>
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
						columns={['inventoryItemId', 'inventoryItemName', 'unitPrice', 'inventoryItemQuantity', 'serialNum']}
						columnNames={['Item Id', 'Item Name', 'Price', 'Quantity', 'Serial#']}
						deleteButtons={true}
						deleteFunction={'deleteInventoryItem'}
						editButtons={true}
						editFunction={ function(route) {FlowRouter.go("/inventory/" + route._id);} }
						data={this.inventoryItems()}
					/>
				</div>
				</div>
			</div>
		)
	}
}

