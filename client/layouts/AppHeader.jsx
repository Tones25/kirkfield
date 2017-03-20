import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AccountsUI from '../AccountsUI.jsx';
import AdminNav from './AdminNav.jsx';
import UserNav from './UserNav.jsx';





export default class AppHeader extends TrackerReact(React.Component) {
	constructor() {
		super();

		
		this.navType = this.navType.bind(this);

	}



	navType() {
		let userRole = '';
		if(Meteor.user()) {
			if (Meteor.user().roles)
				userRole = Meteor.user().roles[0];
		}

		if(userRole == 'admin')
			return(<AdminNav />)
		if(userRole == 'user')
			return(<UserNav />)
		if(userRole == '')
			return(
				<ul className="nav navbar-nav">
					<li><AccountsUI /></li>
				</ul>
				)
		
	}

	render() {
		return (
			<div>
				{this.navType()}
			</div>
			)
	}
}

