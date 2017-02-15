import React, {Component} from 'react';
import InventoryDetail from './InventoryDetail.jsx';

export default class InventorySingle extends Component {

	constructor() {
		super();
		this.state = {editMode: undefined};
		this.setNormalMode = this.setNormalMode.bind(this);
		this.setEditMode = this.setEditMode.bind(this);
	}

	toggleChecked() {
		Meteor.call('toggleResolution', this.props.inventoryItem);
	}

	componentWillMount() {
		this.setState({editMode: false});
	}

	componentWillUnmount() {
		Blaze.remove(this.view);
	}

	setNormalMode() {
		this.setState({editMode: false});
	}


	setEditMode() {
		this.setState({editMode: true});
	}

	deleteInventoryItem() {
		Meteor.call('deleteInventoryItem', this.props.inventoryItem);
	}

	editInventoryItem() {
		this.setState({editMode: false});
		Meteor.call('editInventoryItem', this.props.inventoryItem, inventoryItemName.value, inventoryItemQuantity.value);
	}

	normalView(){
		return(
			<div>
			<a href={`/inventory/${this.props.inventoryItem._id}`}>
					ItemName - {this.props.inventoryItem.inventoryItemName} Quantity -  {this.props.inventoryItem.inventoryItemQuantity}
				</a>

				{status}
				<button className="btn-text"
					onClick={this.setEditMode.bind(this)}>					
					Edit
				</button>
				<DateInput/>
				<button className="btn-cancel"
					onClick={this.deleteInventoryItem.bind(this)}>
					&times; 
				</button>
				</div>
			);
	}

	editView(){
		return(
			<div>
					ItemName -
					<input 
						id="itemName"
						type="text" 
						ref={(input) => {inventoryItemName = input;}}
						defaultValue={this.props.inventoryItem.inventoryItemName}
					/>  
					Quantity -  
					<input 
						id="itemQuantity"
						type="number" 
						ref={(input) => {inventoryItemQuantity = input;}}
						defaultValue={this.props.inventoryItem.inventoryItemQuantity}
					/>

				{status}
				<button className="btn-text"
					onClick={this.editInventoryItem.bind(this)}>
					Apply
				</button>
				<button className="btn-cancel"
					onClick={this.setNormalMode.bind(this)}>					
					Cancel 
				</button>
			</div>
			);
	}

	render() {
		const resolutionClass = this.props.inventoryItem.complete ? "checked" : "";
		const status = this.props.inventoryItem.complete ? <span className="completed">Completed</span> : '';

		return (

			<div>
			<li className={resolutionClass}>
			<input type="checkbox"
				readOnly={true}
				checked={this.props.inventoryItem.complete}
				onClick={this.toggleChecked.bind(this)} />
			{ this.state.editMode ? this.editView() :this.normalView() }
			</li>
			</div>

		)
	}
}