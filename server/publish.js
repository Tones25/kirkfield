Inventory = new Mongo.Collection("inventory");
Jobs = new Mongo.Collection("jobs");
Vehicles = new Mongo.Collection("vehicles");
Employees = new Mongo.Collection("employees");
Customers = new Mongo.Collection("customers");

Meteor.publish("allInventory", function() {
	return Inventory.find();
})

Meteor.publish("queryInventory", function(query) {
	return Inventory.find({inventoryItemName: query});
})

Meteor.publish("allJobs", function() {
	return Jobs.find();
})

Meteor.publish("allVehicles", function() {
	return Vehicles.find();
})

Meteor.publish("allEmployees", function() {
	return Employees.find();
})

Meteor.publish("allCustomers", function() {
	return Customers.find();
})

Meteor.publish("dateRangeJobs", function(startDate, endDate) {
	return Jobs.find({
		date:{
			$gte: startDate,
			$lt: endDate
		}
	});
})