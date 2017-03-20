import React, {Component} from 'react';
import { Match, check } from 'meteor/check';
import {Inventory} from './InventoryInputWrapper.jsx';

export default class InventoryForm extends Component {

	addInventoryItem(event) {
		event.preventDefault();
		let inventoryItemId = this.refs.inventoryItemId.value.trim();
		let inventoryItemName = this.refs.inventoryItemName.value.trim();
		let unitPrice = this.refs.inventoryItemPrice.value.trim();
		let inventoryItemQuantity = this.refs.inventoryItemQuantity.value.trim();
		let make = this.refs.inventoryItemMake.value.trim();
		let model = this.refs.inventoryItemModel.value.trim();
		let serialNum = this.refs.inventoryItemSerial.value.trim();
		let validInput = true;
		//add further input validation rules here
		if(inventoryItemId) {
			if (!parseInt(inventoryItemId)) {
				Bert.alert('id must be a number', 'danger', 'fixed-top', 'fa-frown-o');
				validInput = false;
			}
			if (inventoryItemQuantity < 0) {
				Bert.alert('quantity can\'t be negative', 'danger', 'fixed-top', 'fa-frown-o');
				validInput = false;
			}
		if (validInput) {
			Meteor.call('addInventoryItem', inventoryItemId, inventoryItemName, unitPrice, inventoryItemQuantity, make, model, serialNum, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
			Bert.alert('Successfully added Item: ' + inventoryItemName, 'success', 'fixed-top', 'fa-smile-o');
			this.refs.inventoryItemId.value = parseInt(inventoryItemId) + 1;
			this.refs.inventoryItemName.value = "";
			this.refs.inventoryItemPrice.value = "";
			this.refs.inventoryItemQuantity.value = "";
			this.refs.inventoryItemMake.value = "";
			this.refs.inventoryItemModel.value = "";
			this.refs.inventoryItemSerial.value = "";
			}
		});
		}}

		
	}
	
	render() {
		var id = Inventory.findOne(
			{},
			{sort: {inventoryItemId: -1},
			limit: 1}
		);
		if (id == undefined) {
			return <div>Loading...</div>
		}
		return(
			
			<form className="form-horizontal" onSubmit={this.addInventoryItem.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemId">Item Id:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="itemId"
						type="text" 
						ref="inventoryItemId"
						defaultValue={parseInt(id.inventoryItemId)+1}
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="itemName">Item Name:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="itemName"
						type="text" 
						ref="inventoryItemName"
						placeholder="Item Name"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemMake">Make:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="itemMake"
						type="text" 
						ref="inventoryItemMake"
						placeholder="Item Make"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="itemModel">Model Number:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="itemModel"
						type="text" 
						ref="inventoryItemModel"
						placeholder="Item Model"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemModelName">Model Name:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemModelName"
						type="text" 
						ref="inventoryItemModelName"
						placeholder="Item Model Name"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemSerial">Serial Number:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemSerial"
						type="text" 
						ref="inventoryItemSerial"
						placeholder="Item Serial"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemCost">Cost ($):</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="itemCost"
						type="number" 
						ref="inventoryItemCost"
						step="0.01"
						placeholder="Item Cost"
					/>
					</div>
					
					<label className="control-label col-sm-2" htmlFor="itemPrice">Price ($):</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="itemPrice"
						type="number" 
						ref="inventoryItemPrice"
						step="0.01"
						placeholder="Item Price"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemQuantity">Stock Quantity:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="itemQuantity"
						type="number" 
						ref="inventoryItemQuantity"
						placeholder="Item Quantity"
					/>
					</div>
					</div>
					
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)
	}
}
