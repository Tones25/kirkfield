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
		this.props.onSelectionChange(event.target.value);
	}
	
	render() {
		return (
			<div>
				
				<select onChange={this.onSelectionChange}>
					{this.state.options.map( (option) => {
						return <option
								key={option._id}
								value={option._id}>
									{option._id}
								</option>
					})}
				</select>
			</div>
		)
	}
}