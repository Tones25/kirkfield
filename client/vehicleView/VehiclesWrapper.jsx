import React from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import VehicleForm from './VehicleForm.jsx';
import VehicleSingle from './VehicleSingle.jsx';
import {Vehicles} from './../vehicleView/VehicleInputWrapper.jsx';




export default class VehiclesWrapper extends TrackerReact(React.Component) {
	constructor() {
		super();

		
		this.state = {
			subscription: {
				vehicles: Meteor.subscribe("allVehicles")
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.vehicles.stop();
	}

	vehicles() {
		return Vehicles.find().fetch();
	}

	render() {
		
		return(
			<div className="row">
				<div className="panel panel-primary">
				<div className="panel-heading">
				<h1>Vehicles</h1>
				</div>
				<div className="panel-body">
				<table className="table">
					<thead>
						<tr>
							<td>Vehicle Id</td>
							<td>Vehicle Name</td>
							<td>Vehicle Make</td>
						</tr>
					</thead>
					<tbody>
					{this.vehicles().map( (vehicles) => {
							return <VehicleSingle key={vehicles._id} vehicle={vehicles} />
					})}
					</tbody>
				</table>
				</div>
				</div>
			</div>

		)
	}
}
