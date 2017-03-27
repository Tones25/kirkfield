import { Meteor } from 'meteor/meteor';
import customerData from './MOCK_CUSTOMER_DATA.js';
Meteor.startup(() => {

	if(Meteor.users.find().count() === 0) {
		let id = Accounts.createUser({
			password: 'admin',
			username: 'admin'
		});
		Roles.setUserRoles(id, ['admin']);
	}

	Accounts.config({
			forbidClientAccountCreation: true,
		
		});


	
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
				userName: firstNameArray[i],
				createdAt: new Date()
			});
			let id = Accounts.createUser({
			password: '123456',
			username: firstNameArray[i]
		});
			Roles.setUserRoles(id, ['user']);
		}
		
		}

	

	if(Inventory.find().count() === 0) {

		for (i = 1; i < 40; i++) {
			let quantityRandom = Math.floor(Math.random() * 50);
			let modelNumRandom = toString(Math.random() * 10000);
			let serialNumRandom = Math.random().toString(36).substring(7);
			let costRandom = parseFloat(parseFloat(Math.random() * 100).toFixed(2) + 50);
			let itemArray1 = ['Filter', 'Furnace', 'A/C'];
			let itemArray2 = ['Spring','Air spring','Gas spring',
				'Shock damper', 'Stop buffer', 'Bumpers','Anti-vibration mount ','Mechanical seal',
				'Braided packing','O-ring seal','Gasket sheet','Flat seal'];
			let item1Random = Math.floor(Math.random() * 3);
			let item2Random = Math.floor(Math.random() * 12);
			let makeArray = ['Lennox', 'LG', 'Daikin', 'Hitachi'];
			let makeRandom = Math.floor(Math.random() * 4);

			Inventory.insert({
				inventoryItemId: i,
				inventoryItemName: itemArray1[item1Random] + ' ' + itemArray2[item2Random],
				cost: costRandom,
				unitPrice: costRandom,
				inventoryItemQuantity: quantityRandom,
				make: makeArray[makeRandom],
				model: modelNumRandom,
				serialNum: serialNumRandom,
				createdAt: new Date()
				
			});

		}

		
	}

	if(Customers.find().count() === 0) {

		let customerJSONArray = customerData;
		for (i = 0; i < customerJSONArray.length; i++) {
			let addressRandom = Math.floor(Math.random() * 550);
			let phoneRnd = Math.floor((Math.random() * 899) + 100) + '-' + Math.floor((Math.random() * 8999) + 1000);
			let monthRandom = Math.floor(Math.random() * 12);
			let dayRandom = Math.floor((Math.random() * 32) + 1);
			let yearSubString = parseInt(customerJSONArray[i].createdAt.substring(6));
			let monthSubString = parseInt(customerJSONArray[i].createdAt.substring(0, 2)) - 1;
			let daySubString = parseInt(customerJSONArray[i].createdAt.substring(3, 5));

			Customers.insert({
				customerId: customerJSONArray[i].customerId,
				contactName: customerJSONArray[i].contactName,
				address: customerJSONArray[i].address,
				billableOwner: '',
				billableAddress: '',
				phone1: customerJSONArray[i].phone1,
				phone2: '',
				email: customerJSONArray[i].email,
				qsp: customerJSONArray[i].qsp,
				comments: 'Some additional information.',
				nextService: new Date(2017, monthRandom, dayRandom),
				createdAt: new Date(yearSubString, monthSubString, daySubString)
				
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

	if(Jobs.find().count() === 0) {
		let jobTypeArray = ['a', 'b', 'c'];
		let vehicleIdArray = ['aaa123', 'bbb234', 'ccc345', 'ddd456'];
		let yearArray = [2015, 2016, 1017];

		for (i = 1; i < 900; i++) {
			let jobTypeRandom = Math.floor(Math.random() * 3);
			let yearRandom = Math.floor(Math.random() * 3);
			let monthRandom = Math.floor(Math.random() * 12);
			let dayRandom = Math.floor((Math.random() * 32) + 1);
			let estimateRandom = parseFloat(parseFloat(Math.random() * 10000).toFixed(2));
			let costRandom = parseFloat(parseFloat(Math.max(100 , (estimateRandom + ((Math.random() * 1000) - 500)))).toFixed(2));
			let employeeRandom = Math.floor((Math.random() * 6) + 1);
			let vehicleIdRandom = Math.floor(Math.random() * 4);
			let milageRandom = Math.floor((Math.random() * 50) + 1);
			let randomIds = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
			let randomCust = (Math.floor(Math.random() * 100)) + 1;
			let randomQts = [Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1)];
			let cust = Customers.findOne({customerId: parseInt(randomCust)});
			let emp = Employees.findOne({employeeId: parseInt(employeeRandom)});
			let vehicle = Vehicles.findOne({vehicleId: (Math.floor(Math.random() * 4) + 1)});
			

			Jobs.insert({
				invoice: i,
				complete: true,
				date: new Date(2017, monthRandom, dayRandom),
				customer: randomCust,
				cName: cust.contactName,
				cAddr: cust.address,
				cPhn1: cust.phone1,
				cPhn2: cust.phone2,
				jobTypeCode: jobTypeArray[jobTypeRandom],
				estimateCost: estimateRandom,
				estimateParts: {},
				estimateEmployee: employeeRandom,
				empName: emp.employeeFirstName,
				installCost: costRandom,
				installParts: {},
				installations: [{key: 'installItem0', item: randomIds[0], quantity: randomQts[0]},
						{key: 'installItem1', item: randomIds[1], quantity: randomQts[1]},
						{key: 'installItem2', item: randomIds[2], quantity: randomQts[2]}],
				installEmployee: employeeRandom,
				vehicleId: vehicle,
				mileage: milageRandom,
				comments: "Worst. Job. Ever!",
				createdAt: new Date()
				
			});

		}

		for (i = 1; i <= 50; i++) {
			let jobTypeRandom = Math.floor(Math.random() * 3);
			let yearRandom = Math.floor(Math.random() * 3);
			let monthRandom = Math.floor(Math.random() * 12);
			let dayRandom = Math.floor((Math.random() * 32) + 1);
			let estimateRandom = parseFloat(parseFloat(Math.random() * 10000).toFixed(2));
			let costRandom = parseFloat(parseFloat(Math.max(100 , (estimateRandom + ((Math.random() * 1000) - 500)))).toFixed(2));
			let employeeRandom = Math.floor((Math.random() * 6) + 1);
			let vehicleIdRandom = Math.floor(Math.random() * 4);
			let milageRandom = Math.floor((Math.random() * 50) + 1);
			let randomIds = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
			let randomCust = (Math.floor(Math.random() * 100)) + 1;
			let randomQts = [Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1)];
			let cust = Customers.findOne({customerId: parseInt(randomCust)});
			let emp = Employees.findOne({employeeId: parseInt(employeeRandom)});
			let vehicle = Vehicles.findOne({vehicleId: (Math.floor(Math.random() * 4) + 1)});
			

			Jobs.insert({
				invoice: 900 + i,
				complete: false,
				date: new Date(2017, monthRandom, dayRandom),
				customer: randomCust,
				cName: cust.contactName,
				cAddr: cust.address,
				cPhn1: cust.phone1,
				cPhn2: cust.phone2,
				jobTypeCode: jobTypeArray[jobTypeRandom],
				estimateCost: estimateRandom,
				estimateParts: {},
				estimateEmployee: employeeRandom,
				empName: emp.employeeFirstName,
				installCost: costRandom,
				installParts: {},
				installations: [{key: 'installItem0', item: randomIds[0], quantity: randomQts[0]},
						{key: 'installItem1', item: randomIds[1], quantity: randomQts[1]},
						{key: 'installItem2', item: randomIds[2], quantity: randomQts[2]}],
				installEmployee: employeeRandom,
				vehicleId: vehicle,
				mileage: milageRandom,
				comments: "Worst. Job. Ever!",
				createdAt: new Date()
				
			});

		}

		for (i = 1; i < 50; i++) {
			let jobTypeRandom = Math.floor(Math.random() * 3);
			let yearRandom = Math.floor(Math.random() * 3);
			let monthRandom = Math.floor(Math.random() * 12);
			let dayRandom = Math.floor((Math.random() * 32) + 1);
			let estimateRandom = parseFloat(parseFloat(Math.random() * 10000).toFixed(2));
			let costRandom = parseFloat(parseFloat(Math.max(100 , (estimateRandom + ((Math.random() * 1000) - 500)))).toFixed(2));
			let employeeRandom = Math.floor((Math.random() * 6) + 1);
			let vehicleIdRandom = Math.floor(Math.random() * 4);
			let milageRandom = Math.floor((Math.random() * 50) + 1);
			let randomIds = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
			let randomCust = (Math.floor(Math.random() * 100)) + 1;
			let randomQts = [Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1), Math.floor((Math.random() * 3) + 1)];
			let cust = Customers.findOne({customerId: parseInt(randomCust)});
			let emp = Employees.findOne({employeeId: parseInt(employeeRandom)});
			let vehicle = Vehicles.findOne({vehicleId: (Math.floor(Math.random() * 4) + 1)});
			

			Jobs.insert({
				invoice: 950 + i,
				complete: false,
				date: new Date(2017, monthRandom, dayRandom),
				customer: randomCust,
				cName: cust.contactName,
				cAddr: cust.address,
				cPhn1: cust.phone1,
				cPhn2: cust.phone2,
				jobTypeCode: jobTypeArray[jobTypeRandom],
				estimateCost: estimateRandom,
				estimateParts: {},
				estimateEmployee: employeeRandom,
				empName: emp.employeeFirstName,
				installCost: 0,
				installParts: {},
				installations: [{key: 'installItem0', item: randomIds[0], quantity: randomQts[0]},
						{key: 'installItem1', item: randomIds[1], quantity: randomQts[1]},
						{key: 'installItem2', item: randomIds[2], quantity: randomQts[2]}],
				installEmployee: 1,
				vehicleId: vehicle,
				mileage: milageRandom,
				comments: "Worst. Job. Ever!",
				createdAt: new Date()
				
			});

		}

	
}

});
