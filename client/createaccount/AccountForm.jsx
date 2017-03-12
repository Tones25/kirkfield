import React, {Component} from 'react';

export default class AccountForm extends Component {

	addUser(event) {
		event.preventDefault();
		let userId = this.refs.userId.value.trim();
		let userFirstName = this.refs.userFirstName.value.trim();
		let userLastName = this.refs.userLastName.value.trim();
		
	}

	render() {
		return(
			
			<form className="form-horizontal" onSubmit={this.addUser.bind(this)}>
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="userId">UserId:</label>
					<div className="col-sm-10">
					<input 
						className="form-control"
						id="userId"
						type="text" 
						ref="userId"
						placeholder="UserId"
					/>
					</div>
					</div>
					
					<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="userFirstName">First Name:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="userFirstName"
						type="text" 
						ref="userFirstName"
						placeholder="First Name"
					/>
					</div>
					<label className="control-label col-sm-2" htmlFor="userLastName">Last Name:</label>
					<div className="col-sm-4">
					<input 
						className="form-control"
						id="userLastName"
						type="text" 
						ref="userLastName"
						placeholder="Last Name"
					/>
					</div>
					</div>
					
					
					
				
					
					<input type="submit" className="btn btn-primary pull-right"/>
				</form>
			)
	}
}
