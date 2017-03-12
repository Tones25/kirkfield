import React, {Component} from 'react';

export default class AccountSingle extends Component {

	render() {
		return (
			<div>
				
				<ul className="list-group">
					<li className="list-group-item">
						<a href={`/User/${this.props.users._id}`}>
							User Id: {this.props.User.userId}
						</a>
					</li>
					<li className="list-group-item">
						First Name: {this.props.User.userFirstName}
					</li>
					<li className="list-group-item">
						Last Name: {this.props.User.userLastName}
					</li>
					
				</ul>
			</div>		
				   
		)
	}
}

