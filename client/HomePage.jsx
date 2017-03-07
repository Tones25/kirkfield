import React, {Component} from 'react';

export default class HomePage extends Component {

	setVar() {
		Session.set('Meteor.loginButtons.dropdownVisible', true);
	}

	render() {
		return(
		<div className="row">

			<div className="col-sm-6">
				<form method="post" action="/inventoryInput">
				<button
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-shopping-cart"></span> Inventory
				</button>
				</form>
			</div>
			<div className="col-sm-6">
				<form method="post" action="/jobInput">
				<button
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-briefcase"></span> Jobs
				</button>
				</form>
			</div>
			
			<div className="col-sm-6">
				<form method="post" action="/vehicleInput">
				<button
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-road"></span> Vehicles
				</button>
				</form>
			</div>
			<div className="col-sm-6">
				<form method="post" action="/employees">
				<button
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-user"></span> Employees
				</button>
				</form>
			</div>
			
			<div className="col-sm-12">
				<form method="post" action="/reporting">
				<button
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-th-list"></span> Reports 
				</button>
				</form>
			</div>

		</div>
		)
	}
}
