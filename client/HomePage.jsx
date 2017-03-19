import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
		<ReactCSSTransitionGroup
					transitionName="inventoryButton"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={500}>
			<div className="col-sm-6">
				<button onClick={this.inv.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-shopping-cart"></span> Inventory
				</button>
			</div>
		</ReactCSSTransitionGroup>
		
		<ReactCSSTransitionGroup
					transitionName="jobsButton"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={750}>
			<div className="col-sm-6">
				<button onClick={this.job.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-briefcase"></span> Jobs
				</button>
			</div>
		</ReactCSSTransitionGroup>
		
		<ReactCSSTransitionGroup
					transitionName="vehiclesButton"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={1000}>
			<div className="col-sm-6">
				<button onClick={this.veh.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-road"></span> Vehicles
				</button>
			</div>
		</ReactCSSTransitionGroup>
		<ReactCSSTransitionGroup
					transitionName="employeesButton"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={1250}>
			<div className="col-sm-6">
				<button onClick={this.emp.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-user"></span> Employees
				</button>
			</div>
		</ReactCSSTransitionGroup>	
		<ReactCSSTransitionGroup
					transitionName="reportsButton"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
					transitionAppear={true}
					transitionAppearTimeout={1500}>	
			<div className="col-sm-12">
				<button onClick={this.rep.bind(this)}
						className="btn btn-primary btn-lg btn-block homePageButtons"
				>
				<span className="glyphicon glyphicon-th-list"></span> Reports 
				</button>
			</div>
		</ReactCSSTransitionGroup>
		</div>
		)
	}
}
