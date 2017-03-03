import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import InventoryForm from './InventoryForm.jsx';
import InventorySingle from './InventorySingle.jsx';
import {Inventory} from './InventoryInputWrapper.jsx';
import DataTable from './../DataTable.jsx';



export default class InventorySearchWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		
		this.state = {
			
			subscription: {
				inventorySearch: Meteor.subscribe("queryInventory", "")
			}
		}
	}

	//uncomment to empty the queried item subscriptions
	componentWillUnmount() {
		//this.state.subscription.inventorySearch.stop();
	}


	updateState(event) {
		event.preventDefault();
		this.setState({
			
			subscription: {
				inventorySearch: Meteor.subscribe("queryInventory", this.refs.query.value.trim())
				}
			})
		this.updateSesh(event);
	}

	updateSesh(event) {
		event.preventDefault();
		Session.set('query', this.refs.query.value.trim());
		this.forceUpdate();
	}


	inventoryItems() {
		
		return Inventory.find({inventoryItemName: Session.get('query')}).fetch();
	}
	

	render() {
		let tableRowHeight = 50;
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Search Inventory Items</h1>
				</div>
				<div className="panel-body">
				
				<form 
				className="form-horizontal" 
				onSubmit={this.updateState.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="searchTerm">Search Term:
					</label>
					<div className="col-sm-10">
					<input 
						type="text"
						id="searchTerm"
						ref="query"
						placeholder="Search Term"
						className="form-control"
					/>
					</div>
					</div>
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
				
				<h4>Search Results</h4>
				<DataTable 
						rowHeight={tableRowHeight}
						columns={['inventoryItemId', 'inventoryItemName', 'inventoryItemQuantity']}
						columnNames={['Item Id', 'Item Name', 'Quantity']}
						data={this.inventoryItems()}
				/>
					
				</div>
				</div>
			</div>

		)
	}
}
