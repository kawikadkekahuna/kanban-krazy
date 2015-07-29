'use strict';

Meteor.startup(function(){

	// if(UsersCollection.find().fetch().length === 0){

	// 	UsersCollection.insert({
	// 		username:'admin@admin.com',
	// 		password:'pw',
	// 		show:false,
	// 		added: Date.now()
	// 	});
	// }

  if(TasksCollection.find().fetch().length === 0) {

    var tasks = [{

      title: "TASK ONE",
      description: "Ipsum lorem",
      status: "TO DO",
      created_at: Date.now()
    },{

      title: "TASK TWO",
      description: "More ipsum lorem",
      status: "IN PROGRESS",
      created_at: Date.now()
    },{

      title: "TASK THREE",
      description: "Render the template",
      status: "DONE",
      created_at: Date.now()
    },{

      title: "TASK FOUR",
      description: "Run the app",
      status: "TO DO",
      created_at: Date.now()
    },{

      title: "TASK FIVE",
      description: "Refactor the routes",
      status: "IN PROGRESS",
      created_at: Date.now()
    }];

    for(var i = 0; i < tasks.length; i++) {

      TasksCollection.insert({

        title: tasks[i].title,
        description: tasks[i].description,
        status: tasks[i].status
      });
    }
  }
});