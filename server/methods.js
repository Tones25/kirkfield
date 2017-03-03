Meteor.methods({

	toggleResolution(resolution) {
		if(Meteor.userId() !== resolution.user) {
			throw new Meteor.Error('Not authorized')
		}
		Resolutions.update(resolution._id, {
			$set: {complete: !resolution.complete}
		})
	},



	addInventoryItem(inventoryItemId, inventoryItemName, inventoryItemQuantity) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('Not authorized')
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
				inventoryItemQuantity: parseInt(inventoryItemQuantity),
				complete: false,
				createdAt: new Date(),
				user: Meteor.userId()
			})
		}
	},

	editInventoryItem(inventoryItem, inventoryItemName, inventoryItemQuantity) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('Not authorized')
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

	deleteInventoryItem(inventoryItem) {
		//can only delete items user inserted
		//might have to change
		if(Meteor.userId() !== inventoryItem.user) {
			throw new Meteor.Error('Not authorized')
		}
		Inventory.remove(inventoryItem._id)
	},

	addJob(invoice, date, firstName, lastName, address, phoneNumber, email, jobTypeCode,
			estimateCost, estimateParts, estimateEmployee, installCost, installParts, installIds, installQts, installEmployee, vehicleId, mileage) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('Not authorized')
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
				console.log(installQts[i])
				let quant = installQts[i] || 1
				console.log(quant)
				newQuantity = entry.inventoryItemQuantity - quant
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
			throw new Meteor.Error('Not authorized')
		}

		Vehicles.insert({
			vehicleId: vehicleId,
			vehicleName: vehicleName,
			vehicleMake: vehicleMake,
			vehicleModel: vehicleModel,
			vehicleModelYear: vehicleModelYear,
			licensePlate: licensePlate,
-			color: color,
-			initialMileage: initialMileage,
			createdAt: new Date(),
			user: Meteor.userId()
		})
	},
	
	deleteVehicle(vehicle) {
		//can only delete vehicles user inserted
		//might have to change
		if(Meteor.userId() !== vehicle.user) {
			throw new Meteor.Error('Not authorized')
		}
		Vehicles.remove(vehicle._id)
	},

	addEmployee(employeeId, employeeFirstName, employeeLastName, 
		employeeStartDate, employeeExperience, employeeHourlyRate) {
		if(!Meteor.userId()) {
			throw new Meteor.Error('Not authorized')
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
			throw new Meteor.Error('Not authorized')
		}
		Employees.remove(employee._id)
	},
	
});