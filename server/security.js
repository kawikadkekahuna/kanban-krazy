'use strict';

TasksCollection.allow({
  'insert': function (userId,doc) {

    return (userId === Meteor.userId);
  },
  'update': function (userId,doc) {

    return (userId === Meteor.userId);
  }
});