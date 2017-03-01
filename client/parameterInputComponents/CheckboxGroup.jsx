import React, {Component} from 'react';

export default class Checkbox extends Component {

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
			<div className="form-group">
				{this.state.options.map( (option) => {
					return <input
							type="checkbox"
							onChange={this.onSelectionChange}
							key={option._id}
							value={option._id}/>
				})}
			</div>
		)
	}
}