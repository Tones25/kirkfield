import React, {Component} from 'react';

export default class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: this.props.options
		}
		this.onSelectionChange = this.onSelectionChange.bind(this);
		//console.log(this.props.defaultValue);
		//console.log(this.props.inputElementListAttribute);
		//console.log(this.props.options);
	}
	
	onSelectionChange(event) {
		this.props.onSelectionChange(event.target);
		//console.log(event.target.value);
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
					defaultValue={this.props.defaultValue}
				/>
				<datalist id={this.props.datalistElementIdAttribute}>
					{this.props.options.map( (option) => {
						return <option
									key={option[this.props.datalistElementKey]}
									value={option[this.props.datalistElementKey]}
								>{option[this.props.datalistElementValue]} </option>
					})}
				</datalist>
			</div>
		)
	}
}