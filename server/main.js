import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if(Employees.find().count() === 0) {
	
	let yearRandom = Math.floor((Math.random() * 17) + 2000)
	let monthRandom = Math.floor(Math.random() * 12);
	let dayRandom = Math.floor((Math.random() * 32) + 1);
	let firstNameArray = ['Ted', 'Eddie', 'Bill', 'John', 'Tomas', 'Bobby'];
	let lastNameArray = ['Johnson', 'Adams', 'Martinez', 'Smith', 'Jones', 'Taylor'];
	
	for (i = 0; i < firstNameArray.length; ++i) {
		Employees.insert({
			employeeId: i + 1,
			employeeFirstName: firstNameArray[i],
			employeeLastName: lastNameArray[i],
			employeeStartDate: new Date(yearRandom, monthRandom, dayRandom),
			employeeExperience: (2017 - yearRandom) + Math.floor((Math.random() * 20)),
			employeeHourlyRate: Math.floor((Math.random() * 3)  * 5) + 15,
			createdAt: new Date()
		});
	}
	
	}

	if(Jobs.find().count() === 0) {
		let jobTypeArray = ['a', 'b', 'c'];
		let vehicleIdArray = ['aaa123', 'bbb234', 'ccc345', 'ddd456'];

		for (i = 1; i < 1000; i++) {
			let jobTypeRandom = Math.floor(Math.random() * 3);
			let monthRandom = Math.floor(Math.random() * 12);
			let dayRandom = Math.floor((Math.random() * 32) + 1);
			let estimateRandom = parseFloat(parseFloat(Math.random() * 10000).toFixed(2));
			let costRandom = parseFloat(parseFloat(Math.max(100 , (estimateRandom + ((Math.random() * 1000) - 500)))).toFixed(2));
			let employeeRandom = Math.floor((Math.random() * 6) + 1);
			let vehicleIdRandom = Math.floor(Math.random() * 4);
			let milageRandom = Math.floor((Math.random() * 50) + 1);
			let randomIds = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
			let randomQts = [Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1)];

			Jobs.insert({
				invoice: i,
				date: new Date(2017, monthRandom, dayRandom),
				firstName: 'Billy',
				lastName: 'Bob',
				address: '69 Thorton Bay',
				phoneNumber: 2045559999,
				email: 'be@cool.ca',
				jobTypeCode: jobTypeArray[jobTypeRandom],
				estimateCost: estimateRandom,
				estimateParts: {},
				estimateEmployee: employeeRandom,
				installCost: costRandom,
				installParts: {},
				installIds: randomIds,
				installQts: randomQts,
				installEmployee: employeeRandom,
				vehicleId: vehicleIdArray[vehicleIdRandom],
				mileage: milageRandom,
				complete: false,
				createdAt: new Date()
				
			});

		}

		
	}

	if(Inventory.find().count() === 0) {

		for (i = 1; i < 100; i++) {
			let omonthRandom = Math.floor(Math.random() * 12);
			let odayRandom = Math.floor((Math.random() * 32) + 1);
			let rmonthRandom = Math.floor(Math.random() * 12);
			let rdayRandom = Math.floor((Math.random() * 32) + 1);
			let quantityRandom = Math.floor(Math.random() * 50);
			let modelNumRandom = parseFloat(parseFloat(Math.random() * 10000).toFixed(2));
			let serialNumRandom = parseFloat(parseFloat(Math.random() * 10000).toFixed(2));
			let costRandom = parseFloat(parseFloat(Math.random() * 100).toFixed(2) + 50);

			Inventory.insert({
				inventoryItemId: i,
				inventoryItemName: 'Placeholder Item',
				unitPrice: costRandom,
				inventoryItemQuantity: quantityRandom,
				make: 'Plaecholder Make',
				model: modelNumRandom,
				serialNum: serialNumRandom,
				createdAt: new Date()
				
			});

		}

		
	}
	
	if(Vehicles.find().count() === 0) {
		Vehicles.insert({
			vehicleId: 1,
			vehicleName: 'Truck 1',
			vehicleMake: 'Ford',
			vehicleModel: 'F150',
			vehicleModelYear: 2010,
			licensePlate: 'ABC123',
			color: 'Black',
			initialMileage: 76230,
			createdAt: new Date()
		});
		Vehicles.insert({
			vehicleId: 2,
			vehicleName: 'Truck 2',
			vehicleMake: 'Ford',
			vehicleModel: 'F150',
			vehicleModelYear: 2015,
			licensePlate: 'ABC456',
			color: 'Blue',
			initialMileage: 52553,
			createdAt: new Date()
		});
		Vehicles.insert({
			vehicleId: 3,
			vehicleName: 'Truck 3',
			vehicleMake: 'Ford',
			vehicleModel: 'F250',
			vehicleModelYear: 2010,
			licensePlate: 'XYZ123',
			color: 'Blue',
			initialMileage: 60439,
			createdAt: new Date()
		});
		Vehicles.insert({
			vehicleId: 4,
			vehicleName: 'Truck 4',
			vehicleMake: 'Toyota',
			vehicleModel: 'Tundra',
			vehicleModelYear: 2013,
			licensePlate: 'XYZ456',
			color: 'White',
			initialMileage: 14325,
			createdAt: new Date()
		});
	}

});
