import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Dimensions from 'react-dimensions'
import {Table, Column, Cell} from 'fixed-data-table';

class DataTable extends TrackerReact(React.Component) {
	
	deleteButton(rowIndex) {
		Meteor.call(this.props.deleteFunction, this.props.data[rowIndex]);
	}
	
	editButton(rowIndex) {
		this.props.editFunction(this.props.data[rowIndex]);
	}
	
	render() {
		let columnCount = this.props.columns.length;
		if (this.props.deleteButtons) {
			columnCount++;
		}
		if (this.props.editButtons) {
			columnCount++;
		}
		
		let columnWidth = this.props.containerWidth / columnCount;
		
		let deleteButtonColumn = null;
		if (this.props.deleteButtons) {
			deleteButtonColumn = 
				<Column
					key={"deleteButtons"}
					header={<Cell className="text-center">Delete</Cell>}
					cell={props => (
						<Cell {...props}>
							<button className="btn btn-danger btn-block"
								onClick={() => {this.deleteButton(props.rowIndex)}}>
								Delete <span className="glyphicon glyphicon-trash"></span> 
							</button>
						</Cell>
						)}
					width={columnWidth}
				/>;
		}
		
		let editButtonColumn = null;
		if (this.props.editButtons) {
			editButtonColumn = 
				<Column
					key={"editButtons"}
					header={<Cell className="text-center">Edit</Cell>}
					cell={props => (
						<Cell {...props}>
							<button className="btn btn-warning btn-block"
								onClick={() => {this.editButton(props.rowIndex)}}>
								Edit <span className="glyphicon glyphicon-pencil"></span> 
							</button>
						</Cell>
						)}
					width={columnWidth}
				/>;
		}
		//console.log(this.props.data);
		return (<Table	
						rowsCount={this.props.data.length}
						rowHeight={this.props.rowHeight}
						headerHeight={this.props.rowHeight}
						width={this.props.containerWidth}
						maxHeight={this.props.rowHeight * 10}
						>
						{this.props.columns.map( (col) => {
							
							return <Column 
									key={col}
									header={<Cell className="text-center">
												{this.props.columnNames[this.props.columns.indexOf(col)]}
											</Cell>}
									cell={props => (
									<Cell className="text-center"{...props}>
										{this.props.data[props.rowIndex][col]}
									</Cell>
									)}
								flexgrow={1}
								width={columnWidth}/>
							}
						)}
						{editButtonColumn}
						{deleteButtonColumn}
					</Table>)
	}
}
export default Dimensions({
	getWidth: function(element) {
		let parent = element.parentElement;
		let parentStyle = window.getComputedStyle(parent, null);
		let parentLeftPadding = parentStyle.getPropertyValue("padding-left");
		let parentRightPadding = parentStyle.getPropertyValue("padding-right");
		
		parentLeftPadding = parentLeftPadding.substring(0, parentLeftPadding.length - 2);
		parentRightPadding = parentRightPadding.substring(0, parentRightPadding.length - 2);
		
		parentLeftPadding = parseInt(parentLeftPadding);
		parentRightPadding = parseInt(parentRightPadding);
		
		return parent.getBoundingClientRect().width - (parentLeftPadding + parentRightPadding);
	},
	getHeight: function(element) {
		return window.innerHeight - 100;
	}
})(DataTable)