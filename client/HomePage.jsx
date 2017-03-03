import React, {Component} from 'react';

export default class HomePage extends Component {

	setVar() {
		Session.set('Meteor.loginButtons.dropdownVisible', true);
	}

	render() {
		return(
		<div className="row">

			<div className="col-sm-6">
				<button type="button"
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-shopping-cart"></span> Inventory
				</button>
			</div>
			<div className="col-sm-6">
				<button type="button"
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-briefcase"></span> Jobs
				</button>
			</div>
			
			<div className="col-sm-6">
				<button type="button"
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-road"></span> Vehicles
				</button>
			</div>
			<div className="col-sm-6">
				<button type="button"
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-user"></span> Employees
				</button>
			</div>
			
			<div className="col-sm-12">
				<button type="button"
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-th-list"></span> Reports 
				</button>
			</div>

		</div>
		)
	}
}
