'use strict';

Meteor.startup(function(){

	if(UsersCollection.find().fetch().length === 0){
		UsersCollection.insert({
			username:'admin@2.com',
			password:'.',
			show:false,
			added: Date.now()
		});
	}
});