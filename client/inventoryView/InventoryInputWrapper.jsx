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
		};
	}

	componentWillUnmount() {
		this.state.subscription.inventory.stop();
	}

	inventoryItems() {
		return Inventory.find().fetch();
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
					<h1>Recently Added Inventory</h1>
				</div>
				<div className="panel-body">
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

