import React, {Component} from 'react';

export default class HomePage extends Component {

	setVar() {
		Session.set('Meteor.loginButtons.dropdownVisible', true);
	}

	inv(route) {
		FlowRouter.go('/inventoryInput');
	}

	job(route) {
		FlowRouter.go('/jobInput');
	}

	veh(route) {
		FlowRouter.go('/vehicleInput');
	}

	emp(route) {
		FlowRouter.go('/employees');
	}

	rep(route) {
		FlowRouter.go('/reporting');
	}

	render() {
		return(
		<div className="row">

			<div className="col-sm-6">
				<button onClick={this.inv.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-shopping-cart"></span> Inventory
				</button>
			</div>
			<div className="col-sm-6">
				<button onClick={this.job.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-briefcase"></span> Jobs
				</button>
			</div>
			
			<div className="col-sm-6">
				<button onClick={this.veh.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-road"></span> Vehicles
				</button>
			</div>
			<div className="col-sm-6">
				<button onClick={this.emp.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-user"></span> Employees
				</button>
			</div>
			
			<div className="col-sm-12">
				<button onClick={this.rep.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-th-list"></span> Reports 
				</button>
			</div>

		</div>
		)
	}
}
