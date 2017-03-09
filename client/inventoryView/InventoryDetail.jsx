import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Inventory} from './InventoryInputWrapper.jsx'


export default class InventoryDetail extends TrackerReact(Component) {

	constructor() {
		super();

		this.state = {
			subscription: {
				inventory: Meteor.subscribe("allInventory")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.inventory.stop();
	}

	editInventoryItem(event) {
		event.preventDefault();
		let item = this.inventory();
		let inventoryItemName = this.refs.inventoryItemName.value.trim();
		let unitPrice = this.refs.inventoryItemPrice.value.trim();
		let inventoryItemQuantity = this.refs.inventoryItemQuantity.value.trim();
		let make = this.refs.inventoryItemMake.value.trim();
		let model = this.refs.inventoryItemModel.value.trim();
		let serialNum = this.refs.inventoryItemSerial.value.trim();
		let validInput = true;
		//add further input validation rules here
		if (inventoryItemQuantity < 0) {
			Bert.alert('quantity can\'t be negative', 'danger', 'fixed-top', 'fa-frown-o');
			validInput = false;
		}
		if (validInput) {
			Meteor.call('editInventoryItem', item, inventoryItemName, unitPrice, inventoryItemQuantity, make, model, serialNum, (error, data) => {
			if(error) {
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			} else {
				Bert.alert('Changes saved', 'success', 'fixed-top', 'fa-smile-o');
			}
		});
		}

		
	}	

	inventory() {
		return Inventory.findOne(this.props.id);
	}

	back() {
		FlowRouter.go("/inventoryInput");
	}

	render() {
		let item = this.inventory();

		if(!item) {
			return(<div>Loading...</div>)
		}
		return(
			<div>				
				<button className="btn btn-primary" onClick={this.back.bind(this)}>
						Back to Inventory<span className="glyphicon glyphicon-return"></span>
				</button>
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>{item.inventoryItemName}&emsp;(Item#{item.inventoryItemId})</h1>
				</div>
				<div className="panel-body">
				<form className="form-horizontal" onSubmit={this.editInventoryItem.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemName">Item Name:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemName"
						type="text" 
						ref="inventoryItemName"
						defaultValue={item.inventoryItemName}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemPrice">Price: $</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemPrice"
						type="number" 
						ref="inventoryItemPrice"
						step="0.01"
						defaultValue={item.unitPrice}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemQuantity">Stock Quantity:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemQuantity"
						type="number" 
						ref="inventoryItemQuantity"
						defaultValue={item.inventoryItemQuantity}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemMake">Make:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemMake"
						type="text" 
						ref="inventoryItemMake"
						defaultValue={item.make}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemModel">Model#:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemModel"
						type="text" 
						ref="inventoryItemModel"
						defaultValue={item.model}
					/>
					</div>
					</div>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="itemSerial">Serial#:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="itemSerial"
						type="text" 
						ref="inventoryItemSerial"
						defaultValue={item.serialNum}
					/>
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
				</div>
			</div>
			</div>
			)
	}
}
