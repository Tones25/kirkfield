Meteor.methods({

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

	addJob(invoice, date, customer, jobTypeCode,
			estimateCost, estimateEmployee,
			installCost, installations, installEmployee, vehicleId, mileage) {
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
				customer: customer,
				jobTypeCode: jobTypeCode,
				estimateCost: parseFloat(estimateCost),
				estimateEmployee: parseInt(estimateEmployee),
				installCost: parseFloat(installCost),
				installations: installations,
				installEmployee: parseInt(installEmployee),
				vehicleId: vehicleId,
				mileage: parseInt(mileage),
				complete: false,
				createdAt: new Date(),
				user: Meteor.userId()
			})
			//Decrease stock quantity of job's installed items
			if (installations[0].item) {
			for (var i=0;i<installations.length;i++) {
				entry = Inventory.findOne({inventoryItemId: parseInt(installations[i].item)})
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
	},

	editJobItem(job, date, customer, jobTypeCode,
			estimateCost, estimateEmployee,
			installCost, installations, installEmployee, vehicleId, mileage) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Jobs.findOne({_id: job._id})
		if(entry) {
			let dateTokens = date.split("-");
			let dateYear = parseInt(dateTokens[0]);
			let dateMonth = parseInt(dateTokens[1]) - 1; //BSON month is 0 based
			let dateDay = parseInt(dateTokens[2]);
			Jobs.update(
				{_id: entry._id},
				{$set: {
				date: new Date(dateYear, dateMonth, dateDay),
				customer: customer,
				jobTypeCode: jobTypeCode,
				estimateCost: parseFloat(estimateCost),
				estimateEmployee: parseInt(estimateEmployee),
				installCost: parseFloat(installCost),
				installations: installations,
				installEmployee: parseInt(installEmployee),
				vehicleId: vehicleId,
				mileage: parseInt(mileage),
				complete: false
		}})} else {
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
	
	addVehicle(vehicleId, vehicleMake,
		vehicleModel, vehicleModelYear, licensePlate,
		color, initialMileage, repairHist, description, 
		lastOil, nextOil) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Vehicles.findOne({vehicleId: parseInt(vehicleId)})
		if(entry) {
			throw new Meteor.Error('Duplicate id')
		}
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
		color, initialMileage, repairHist, description, 
		lastOil, nextOil) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('You must be logged in.')
		}
		entry = Vehicles.findOne({_id: vehicle._id})
		if(entry) {
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
			initialMileage: initialMileage,
			description: description,
			repairHist: repairHist,
			lastOil:  lOil,
			nextOil:  nOil,
			createdAt: new Date(),
			user: Meteor.userId()
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