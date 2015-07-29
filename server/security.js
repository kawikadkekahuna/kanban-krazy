'use strict';

TasksCollection.allow({
  'insert': function (userId,doc) {
    return (userId === Meteor.user()._id);
  },
  'update': function (userId,doc) {
    return (userId === Meteor.user()._id);
  }
});