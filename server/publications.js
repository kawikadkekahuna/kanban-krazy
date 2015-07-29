'use strict';

Meteor.publish('tasks_to_do', function() {
  return TasksCollection.find({status:"TO DO"});
});

Meteor.publish('tasks_in_progress', function() {
  return TasksCollection.find({status:"IN PROGRESS"});
});

Meteor.publish('tasks_done', function() {
  return TasksCollection.find({status:"DONE"});
});