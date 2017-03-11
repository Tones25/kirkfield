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
					header={<Cell>Delete</Cell>}
					cell={props => (
						<Cell {...props}>
							<button className="btn btn-danger"
								onClick={() => {this.deleteButton(props.rowIndex)}}>
								<span className="glyphicon glyphicon-trash"></span> Delete
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
					header={<Cell>Edit</Cell>}
					cell={props => (
						<Cell {...props}>
							<button className="btn btn-warning"
								onClick={() => {this.editButton(props.rowIndex)}}>
								<span className="glyphicon glyphicon-pencil"></span> Edit
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
									header={<Cell>{this.props.columnNames[this.props.columns.indexOf(col)]}</Cell>}
									cell={props => (
									<Cell {...props}>
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
		return element.parentElement.getBoundingClientRect().width * .8;
	},
	getHeight: function(element) {
		return window.innerHeight - 100;
	}
})(DataTable)