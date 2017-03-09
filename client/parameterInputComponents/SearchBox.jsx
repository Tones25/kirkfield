import React, {Component} from 'react';

export default class Dropdown extends Component {

	constructor(props) {
		super(props);
		this.state = {
			options: this.props.options
		}
		this.onSelectionChange = this.onSelectionChange.bind(this);
	}
	
	onSelectionChange(event) {
		this.props.onSelectionChange(event.target);
	}
	
	render() {
		return (
			<div>
				<input 
					onChange={this.onSelectionChange}
					list={this.props.inputElementListAttribute}
					ref={this.props.inputElementRefAttribute}
					className="form-control"
					placeholder={this.props.placeholder}
				/>
				<datalist id={this.props.datalistElementIdAttribute}>
					{this.props.options.map( (option) => {
						return <option
									key={option._id}
									value={option._id} 
								/>
					})}
				</datalist>
			</div>
		)
	}
}