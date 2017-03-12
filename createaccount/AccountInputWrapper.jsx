import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import AccountSingleForm from './AccountForm.jsx';
import AccountSingle from './AccountSingle.jsx';

export const User = new Mongo.Collection("User");

export default class AccountInputWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();


this.state = {
			subscription: {
				User: Meteor.subscribe("allUsers")
			}
		}
	}		

componentWillUnmount() {
		this.state.subscription.User.stop();
	}	

userss() {
		return User.find().fetch();
	}	

render() {
		
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>Add Account</h1>
				</div>
				<div className="panel-body">
					<AccountForm />
				</div>
				</div>
				
				
				
					<div className="panel-group" id="employeeAccordion">
	
					{this.User().map( (User) => {
						return <div className="panel panel-default" key={users._id}>
							<div className="panel-heading">
								<h4 className="panel-title">
									<a 	data-toggle="collapse"
										
										href={"#collapse" + users._id}>{User.username}
									</a>
								</h4>
							</div>
							<div id={"collapse" + users._id} className="panel-collapse collapse">
								<div className="panel-body">
									<Usersingle key={users._id} user={User} />
								</div>
							</div>
						</div>
					})}
					
					</div>
				</div>
				</div>
			</div>
		)
	}
}	
