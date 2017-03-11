Meteor.methods({

	toggleResolution(resolution) {
		if(Meteor.userId() !== resolution.user) {
			throw new Meteor.Error('You must be logged in.')
		}
		Resolutions.update(resolution._id, {
			$set: {complete: !resolution.complete}
		})
	},

	generateId(Table, idFieldName) {
		let count = 0;
		//console.log(Table, idFieldName);
		return 0;
		/*for (var i=0; i<2; i++) {
			entry = Table.findOne({idFieldName: i})
			console.log(entry)
			if (!entry) {
				return i;
				break;
			}
		}*/
	},

	goToRoute(route) {
		//console.log(route);
		FlowRouter.go(route);
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

	addJob(invoice, date, firstName, lastName, address, phoneNumber, email, jobTypeCode,
			estimateCost, estimateParts, estimateEmployee, installCost, installParts, installIds, installQts, installEmployee, vehicleId, mileage) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
			entry = Jobs.findOne({invoice: parseInt(invoice)})
		if(entry) {
			throw new Meteor.Error('Duplicate invoice')
		}
			let dateTokens = date.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);

			Jobs.insert({
				invoice: parseInt(invoice),
				date: new Date(dateYear, dateMonth, dateDay),
				firstName: firstName,
				lastName: lastName,
				address: address,
				phoneNumber: parseInt(phoneNumber),
				email: email,
				jobTypeCode: jobTypeCode,
				estimateCost: parseFloat(estimateCost),
				estimateParts: estimateParts,
				estimateEmployee: parseInt(estimateEmployee),
				installCost: parseFloat(installCost),
				installParts: installParts,
				installIds: installIds,
				installQts: installQts,
				installEmployee: parseInt(installEmployee),
				vehicleId: vehicleId,
				mileage: parseInt(mileage),
				complete: false,
				createdAt: new Date(),
				user: Meteor.userId()
			})
			//Decrease stock quantity of job's installed items
			for (var i=0;i<installIds.length;i++) {
				entry = Inventory.findOne({inventoryItemId: parseInt(installIds[i])})
				//console.log(installQts[i])
				let quant = installQts[i] || 1
				//console.log(quant)
				newQuantity = entry.inventoryItemQuantity - quant
				Inventory.update(
					{_id: entry._id},
					{$set: {inventoryItemQuantity: newQuantity}}
					)
			}
		
	},

	editJobItem(inventoryItem, inventoryItemName, inventoryItemQuantity) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Inventory.findOne({_id: inventoryItem._id})
		if(entry) {
			console.log("Attempting database update...");
			newQuantity = parseInt(inventoryItemQuantity)
			Inventory.update(
				{_id: entry._id},
				{$set: {inventoryItemName: inventoryItemName}}
				)
			Inventory.update(
				{_id: entry._id},
				{$set: {inventoryItemQuantity: newQuantity}}
				)
		} else {
			throw new Meteor.Error('Invalid ID')
		}
	},
	
	deleteJobItem(job) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		let installIds = job.installIds
		let installQts = job.installQts
		Jobs.remove(job._id)
		//Restore stock quantity of the deleted job's installed items
		for (var i=0;i<installIds.length;i++) {
			entry = Inventory.findOne({inventoryItemId: parseInt(installIds[i])})
			//console.log(installQts[i])
			let quant = parseInt(installQts[i]) || 1
			//console.log(quant)
			newQuantity = entry.inventoryItemQuantity + quant
			Inventory.update(
				{_id: entry._id},
				{$set: {inventoryItemQuantity: newQuantity}}
				)
		}
	},
	
	addVehicle(vehicleId, vehicleName, vehicleMake,
		vehicleModel, vehicleModelYear, licensePlate,
		color, initialMileage) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Vehicles.findOne({vehicleId: parseInt(vehicleId)})
		if(entry) {
			throw new Meteor.Error('Duplicate id')
		}
		Vehicles.insert({
			vehicleId: vehicleId,
			vehicleName: vehicleName,
			vehicleMake: vehicleMake,
			vehicleModel: vehicleModel,
			vehicleModelYear: vehicleModelYear,
			licensePlate: licensePlate,
			color: color,
			initialMileage: initialMileage,
			createdAt: new Date(),
			user: Meteor.userId()
		})
	},
	
	deleteVehicle(vehicle) {
		//can only delete vehicles user inserted
		//might have to change
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		Vehicles.remove(vehicle._id)
	},

	addEmployee(employeeId, employeeFirstName, employeeLastName, 
		employeeStartDate, employeeExperience, employeeHourlyRate) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Employees.findOne({employeeId: parseInt(employeeId)})
		if(entry) {
			throw new Meteor.Error('Duplicate id')
		}

		Employees.insert({
			employeeId: employeeId,
			employeeFirstName: employeeFirstName,
			employeeLastName: employeeLastName,
			employeeStartDate: employeeStartDate,
			employeeEndDate: null,
			employeeExperience: employeeExperience,
			employeeHourlyRate: employeeHourlyRate,
			createdAt: new Date(),
			user: Meteor.userId()
		})
	},

	deleteEmployee(employee) {
		//can only delete vehicles user inserted
		//might have to change
		if(Meteor.userId() !== employee.user) {
			throw new Meteor.Error('You must be logged in.')
		}
		Employees.remove(employee._id)
	},

	addCustomer(customerId, contactName, address, 
		billableOwner, billableAddress, phone1,
		phone2, qsp, comments, nextService) {
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
				qsp: qsp,
				comments: comments,
				nextService:  new Date(dateYear, dateMonth, dateDay),
				createdAt: new Date()
				
			})
	},

	editCustomer(customer, contactName, address, 
		billableOwner, billableAddress, phone1,
		phone2, qsp, comments, nextService) {
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