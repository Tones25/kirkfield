Meteor.methods({

	addUser(username, password) {
		if(Roles.userIsInRole(Meteor.user(), 'admin')) {
			if(Meteor.users.findOne({username: username})) {
				throw new Meteor.Error('Username already in use.')
			} else {
				let id = Accounts.createUser({
					username: username,
					password: password,
				});

				Roles.setUserRoles(id, ['user']);
			}
		}
	},

	addInventoryItem(inventoryItemId, inventoryItemName, unitPrice, inventoryItemQuantity, make, model, serialNum) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}

		entry = Inventory.findOne({inventoryItemId: inventoryItemId})
		//update quantity if item exists, add new listing if not
		if(entry) {
			newQuantity = parseInt(entry.inventoryItemQuantity) + parseInt(inventoryItemQuantity)
			Inventory.update(
				{_id: entry._id},
				{$set: {inventoryItemQuantity: newQuantity}}
				)
		} else {
			Inventory.insert({
				inventoryItemId: inventoryItemId,
				inventoryItemName: inventoryItemName,
				unitPrice: parseFloat(unitPrice),
				inventoryItemQuantity: parseInt(inventoryItemQuantity),
				make: make,
				model: model,
				serialNum: serialNum,
				createdAt: new Date(),
				user: Meteor.userId()
			})
		}
	},

	editInventoryItem(inventoryItem, inventoryItemName, unitPrice, inventoryItemQuantity, make, model, serialNum) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Inventory.findOne({_id: inventoryItem._id})
		if(entry) {
			Inventory.update(
				{_id: entry._id},
				{$set: {
					inventoryItemName: inventoryItemName,
					unitPrice: unitPrice,
					inventoryItemQuantity: inventoryItemQuantity,
					make: make,
					model: model,
					serialNum: serialNum
				}}
				)
		} else {
			throw new Meteor.Error('Invalid ID')
		}
	},

	deleteInventoryItem(inventoryItem) {
		//can only delete items user inserted
		//might have to change
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		Inventory.remove(inventoryItem._id)
	},

	addJob(invoice, complete, date, customer, jobTypeCode,
			estimateCost, estimateEmployee,
			installCost, installations, installEmployee,
			vehicleId, mileage, comments) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
			entry = Jobs.findOne({invoice: parseInt(invoice)})
		if(entry) {
			throw new Meteor.Error('Duplicate invoice')
		}
			cust = Customers.findOne({customerId: parseInt(customer)});
			if (!cust) throw new Meteor.Error('Invalid Customer')
			emp = Employees.findOne({employeeId: parseInt(installEmployee)});
			if (!emp) throw new Meteor.Error('Invalid Employee')
			let dateTokens = date.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);
			let cName = cust.contactName || '';
			let	cAddr = cust.address || '';
			let	cPhn1 = cust.phone1 || '';
			let	cPhn2 = cust.phone2 || '';
			let empName = emp.employeeFirstName || '';
			console.log(installations[0].item);

			Jobs.insert({
				invoice: parseInt(invoice),
				complete: complete,
				date: new Date(dateYear, dateMonth, dateDay),
				customer: customer,
				cName: cName,
				cAddr: cAddr,
				cPhn1: cPhn1,
				cPhn2: cPhn2,
				jobTypeCode: jobTypeCode,
				estimateCost: parseFloat(estimateCost),
				estimateEmployee: parseInt(estimateEmployee),
				installCost: parseFloat(installCost),
				installations: installations,
				installEmployee: installEmployee,
				empName: empName,
				vehicleId: vehicleId,
				mileage: parseInt(mileage),
				comments: comments,
				createdAt: new Date(),
				user: Meteor.userId()
			})
			//Decrease stock quantity of job's installed items
			if (installations[0].item != null) {
			for (var i=0;i<installations.length;i++) {

				entry = Inventory.findOne({inventoryItemId: parseInt(installations[i].item)})
				if (entry) {
				let quant = installations[i].quantity || 1
				console.log(quant)
				newQuantity = entry.inventoryItemQuantity - quant
				Inventory.update(
					{_id: entry._id},
					{$set: {inventoryItemQuantity: newQuantity}}
					)
				}
			}
		}
	},

	editJobItem(job, complete, date, customer, jobTypeCode,
			estimateCost, estimateEmployee,
			installCost, installations,
			installEmployee, vehicleId, mileage, comments) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Jobs.findOne({_id: job._id})
		if(entry) {
			cust = Customers.findOne({customerId: parseInt(customer)});
			if (!cust) throw new Meteor.Error('Invalid Customer')
			emp = Employees.findOne({employeeId: parseInt(installEmployee)});
			if (!emp) throw new Meteor.Error('Invalid Employee')
			let oldInstalls = entry.installations;
			let dateTokens = date.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);
			Jobs.update(
				{_id: entry._id},
				{$set: {
				complete: complete,
				date: new Date(dateYear, dateMonth, dateDay),
				customer: customer,
				cName: cust.contactName,
				cAddr: cust.address,
				cPhn1: cust.phone1,
				cPhn2: cust.phone2,
				jobTypeCode: jobTypeCode,
				estimateCost: parseFloat(estimateCost),
				estimateEmployee: parseInt(estimateEmployee),
				installCost: parseFloat(installCost),
				installations: installations,
				installEmployee: parseInt(installEmployee),
				empName: emp.employeeFirstName,
				vehicleId: vehicleId,
				mileage: parseInt(mileage),
				comments: comments
		}})

		if (oldInstalls != installations) {
		//Restore stock from the previous version of the job
		for (var i=0;i<oldInstalls.length;i++) {
			entry = Inventory.findOne({inventoryItemId: parseInt(oldInstalls[i].item)});
			if (entry) {
			let quant = parseInt(oldInstalls[i].quantity) || 1
			newQuantity = entry.inventoryItemQuantity + quant
			Inventory.update(
				{_id: entry._id},
				{$set: {inventoryItemQuantity: newQuantity}}
				)
			}
		}

		//Decrease stock quantity of job's new installations
		if (installations[0].item) {
		for (var i=0;i<installations.length;i++) {
			entry = Inventory.findOne({inventoryItemId: parseInt(installations[i].item)})
			if (entry) {
			//console.log(installQts[i])
			let quant = installations[i].quantity || 1
			//console.log(quant)
			newQuantity = entry.inventoryItemQuantity - quant
			Inventory.update(
				{_id: entry._id},
				{$set: {inventoryItemQuantity: newQuantity}}
				)
			}
			}
		}		
	}

	} else {
			throw new Meteor.Error('Invalid ID')
		}
	},
	
	deleteJobItem(job) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		let installIds = job.installations
		Jobs.remove(job._id)
		//Restore stock quantity of the deleted job's installed items
		for (var i=0;i<installIds.length;i++) {
			entry = Inventory.findOne({inventoryItemId: parseInt(installIds[i].item)})
			//console.log(installQts[i])
			let quant = parseInt(installIds[i].quantity) || 1
			//console.log(quant)
			newQuantity = entry.inventoryItemQuantity + quant
			Inventory.update(
				{_id: entry._id},
				{$set: {inventoryItemQuantity: newQuantity}}
				)
		}
	},
	
	addVehicle(vehicleId, vehicleMake,
		vehicleModel, vehicleModelYear, licensePlate,
		color, driver, initialMileage, repairHist,
		description, lastOil, nextOil) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Vehicles.findOne({vehicleId: parseInt(vehicleId)})
		if(entry) {
			throw new Meteor.Error('Duplicate id')
		}
			emp = Employees.findOne({employeeId: parseInt(driver)});
			if (!emp) throw new Meteor.Error('Invalid Employee')
			let dateTokens = lastOil.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);
			let lOil =  new Date(dateYear, dateMonth, dateDay);
			let dateTokens2 = nextOil.split("-");
			let dateYear2 = parseInt(dateTokens2[0]);
			let dateMonth2 = parseInt(dateTokens2[1]) - 1; //BSON month is 0 based
			let dateDay2 = parseInt(dateTokens2[2]);
			let nOil =  new Date(dateYear2, dateMonth2, dateDay2);
		Vehicles.insert({
			vehicleId: vehicleId,
			vehicleMake: vehicleMake,
			vehicleModel: vehicleModel,
			vehicleModelYear: vehicleModelYear,
			licensePlate: licensePlate,
			color: color,
			driver: parseInt(driver),
			driverName: emp.employeeFirstName,
			initialMileage: initialMileage,
			description: description,
			repairHist: repairHist,
			lastOil:  lOil,
			nextOil:  nOil,
			createdAt: new Date(),
			user: Meteor.userId()
		})
	},

		editVehicle(vehicle, vehicleMake,
		vehicleModel, vehicleModelYear, licensePlate,
		color, driver, initialMileage, repairHist, 
		description, lastOil, nextOil) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Vehicles.findOne({_id: vehicle._id})
		if(entry) {
			emp = Employees.findOne({employeeId: parseInt(driver)});
			if (!emp) throw new Meteor.Error('Invalid Employee')
			let dateTokens = lastOil.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);
			let lOil =  new Date(dateYear, dateMonth, dateDay);
			let dateTokens2 = nextOil.split("-");
			let dateYear2 = parseInt(dateTokens2[0]);
			let dateMonth2 = parseInt(dateTokens2[1]) - 1; //BSON month is 0 based
			let dateDay2 = parseInt(dateTokens2[2]);
			let nOil =  new Date(dateYear2, dateMonth2, dateDay2);
		Vehicles.update(
				{_id: entry._id},
				{$set: {
			vehicleMake: vehicleMake,
			vehicleModel: vehicleModel,
			vehicleModelYear: vehicleModelYear,
			licensePlate: licensePlate,
			color: color,
			driver: parseInt(driver),
			driverName: emp.employeeFirstName,
			initialMileage: initialMileage,
			description: description,
			repairHist: repairHist,
			lastOil:  lOil,
			nextOil:  nOil
		}})
	}},
	
	deleteVehicle(vehicle) {
		//can only delete vehicles user inserted
		//might have to change
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		Vehicles.remove(vehicle._id)
	},

	addEmployee(employeeId, employeeFirstName, employeeLastName, 
		employeeStartDate, employeeExperience, employeeHourlyRate,
		userName, password) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}

		entry = Employees.findOne({employeeId: employeeId})
		if(entry) {
			throw new Meteor.Error('Duplicate id')
		}

		if (employeeFirstName.length<1) 
			throw new Meteor.Error('Name cannot be blank.')

		if(Roles.userIsInRole(Meteor.user(), 'admin')) {
			if(Meteor.users.findOne({username: userName})) {
				throw new Meteor.Error('Username already in use.')
			} else {
				let id = Accounts.createUser({
					username: userName,
					password: password,
				});

				Roles.setUserRoles(id, ['user']);
			}
		}

		let dateTokens = employeeStartDate.split("-");
		let dateYear = parseInt(dateTokens[0]);
		let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
		let dateDay = parseInt(dateTokens[2]);

		Employees.insert({
			employeeId: employeeId,
			employeeFirstName: employeeFirstName,
			employeeLastName: employeeLastName,
			employeeStartDate: new Date(dateYear, dateMonth, dateDay),
			employeeEndDate: null,
			employeeExperience: employeeExperience,
			employeeHourlyRate: employeeHourlyRate,
			userName: userName,
			createdAt: new Date(),
			user: Meteor.userId()
		})
	},

	editEmployee(employee, employeeFirstName, employeeLastName, 
		employeeStartDate, employeeExperience, employeeHourlyRate) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Employees.findOne({_id: employee._id})
		if(!entry) {
			throw new Meteor.Error('Invalid id')
		}
		if (employeeFirstName.length<1) throw new Meteor.Error('Name cannot be blank.')

			let dateTokens = employeeStartDate.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);

		Employees.update({_id: entry._id},
			{$set: {
				employeeFirstName: employeeFirstName,
				employeeLastName: employeeLastName,
				employeeStartDate: new Date(dateYear, dateMonth, dateDay),
				employeeEndDate: null,
				employeeExperience: employeeExperience,
				employeeHourlyRate: employeeHourlyRate
		}})
	},

	resetEmployeePassword(employeeId) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Employees.findOne({_id: employeeId})
		if(!entry) {
			throw new Meteor.Error('Invalid id')
		}
		if(Meteor.isServer){
			console.log(employeeId);
			Accounts.setPassword(employeeId, 'password');
			
		}
	},

	deleteEmployee(employee) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		Employees.remove(employee._id)
	},

	addCustomer(customerId, contactName, address, 
		billableOwner, billableAddress, phone1,
		phone2, email, qsp, comments, nextService) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Customers.findOne({customerId: parseInt(customerId)})
		if(entry) {
			throw new Meteor.Error('Duplicate id')
		}
			let dateTokens = nextService.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);


		Customers.insert({
				customerId: customerId,
				contactName: contactName,
				address: address,
				billableOwner: billableOwner,
				billableAddress: billableAddress,
				phone1: phone1,
				phone2: phone2,
				email: email,
				qsp: qsp,
				comments: comments,
				nextService:  new Date(dateYear, dateMonth, dateDay),
				createdAt: new Date()
			})
	},

	editCustomer(customer, contactName, address, 
		billableOwner, billableAddress, phone1,
		phone2, email, qsp, comments, nextService) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Customers.findOne({_id: customer._id})
			let dateTokens = nextService.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);
		if(entry) {
			Customers.update(
				{_id: entry._id},
				{$set: {
					contactName: contactName,
					address: address,
					billableOwner: billableOwner,
					billableAddress: billableAddress,
					phone1: phone1,
					phone2: phone2,
					email: email,
					qsp: qsp,
					comments: comments,
					nextService: new Date(dateYear, dateMonth, dateDay),
				}}
				)
		} else {
			throw new Meteor.Error('Invalid ID')
		}
	},

	deleteCustomer(customer) {
		//can only delete vehicles user inserted
		//might have to change
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		Customers.remove(customer._id)
	},
	
	
});