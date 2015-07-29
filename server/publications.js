Meteor.publish('users',function(){
	return UsersCollection.find();
});