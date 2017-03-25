import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import Reporting from './Reporting.jsx';
import InventoryInputWrapper from './inventoryView/InventoryInputWrapper.jsx';
import InventorySearchWrapper from './inventoryView/InventorySearchWrapper.jsx';
import InventoryDetail from './inventoryView/InventoryDetail.jsx';

import JobInputWrapper from './jobView/JobInputWrapper.jsx';
import JobDetail from './jobView/JobDetail.jsx';
import JobDetailForApproval from './jobView/JobDetailForApproval.jsx';

import CustomerInputWrapper from './customerView/CustomerInputWrapper.jsx';
import CustomerDetail from './customerView/CustomerDetail.jsx';
import CustomerDetailWrapper from './customerView/CustomerDetailWrapper.jsx';

import VehicleInputWrapper from './vehicleView/VehicleInputWrapper.jsx';
import VehiclesWrapper from './vehicleView/VehiclesWrapper.jsx';
import VehicleDetail from './vehicleView/VehicleDetail.jsx';

import ReportWrapper from './reportView/ReportWrapper.jsx';

import EmployeeInputWrapper from './employeeView/EmployeeInputWrapper.jsx';
import EmployeeDetailWrapper from './employeeView/EmployeeDetailWrapper.jsx';

import AdminWrapper from './adminView/AdminWrapper.jsx';

import HomePage from './HomePage.jsx';

FlowRouter.route('/', {
	action() {
		mount(MainLayout, {
			content: (<HomePage />),
		})
	}
})

FlowRouter.route('/inventoryInput', {
	action() {
		mount(MainLayout, {
			content: (<InventoryInputWrapper />),
		})
	}
})

FlowRouter.route('/inventorySearch', {
	action() {
		mount(MainLayout, {
			content: (<InventorySearchWrapper />),
		})
	}
})

FlowRouter.route('/inventory/:id', {
	action(params) {
		mount(MainLayout, {
			//this passes params.id as a prop into RosultionDetail instance
			content: (<InventoryDetail id={params.id} />),
		})
	}
})

FlowRouter.route('/customers', {
	action() {
		mount(MainLayout, {
			content: (<CustomerInputWrapper />),
		})
	}
})

FlowRouter.route('/customer/:id', {
	action(params) {
		mount(MainLayout, {
			//this passes params.id as a prop into RosultionDetail instance
			content: (<CustomerDetailWrapper id={params.id} />),
		})
	}
})

FlowRouter.route('/vehicleInput', {
	action() {
		mount(MainLayout, {
			content: (<VehicleInputWrapper />),
		})
	}
})

FlowRouter.route('/vehicles', {
	action() {
		mount(MainLayout, {
			content: (<VehiclesWrapper />),
		})
	}
})

FlowRouter.route('/vehicle/:id', {
	action(params) {
		mount(MainLayout, {
			//this passes params.id as a prop into RosultionDetail instance
			content: (<VehicleDetail id={params.id} />),
		})
	}
})

FlowRouter.route('/reporting', {
	action() {
		mount(MainLayout, {
			content: (<ReportWrapper />),
		})
	}
})

FlowRouter.route('/jobInput', {
	action() {
		mount(MainLayout, {
			content: (<JobInputWrapper />),
		})
	}
})

FlowRouter.route('/job/:id', {
	action(params) {
		mount(MainLayout, {
			//this passes params.id as a prop into RosultionDetail instance
			content: (<JobDetail id={params.id} />),
		})
	}
})

FlowRouter.route('/jobApproval/:id', {
	action(params) {
		mount(MainLayout, {
			//this passes params.id as a prop into RosultionDetail instance
			content: (<JobDetailForApproval id={params.id} />),
		})
	}
})

FlowRouter.route('/employees', {
	action() {
		mount(MainLayout, {
			content: (<EmployeeInputWrapper />),
		})
	}
})

FlowRouter.route('/employee/:id', {
	action(params) {
		mount(MainLayout, {
			//this passes params.id as a prop into RosultionDetail instance
			content: (<EmployeeDetailWrapper id={params.id} />),		
    })
	}
})

FlowRouter.route('/admin', {
	action() {
		mount(MainLayout, {
			content: (<AdminWrapper />),
		})
	}
})


