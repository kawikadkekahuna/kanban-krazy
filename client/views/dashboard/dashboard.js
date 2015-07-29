'use strict';

var DEFAULT_STATUS = "TO DO";
var TO_DO_STATUS = "TO DO";
var IN_PROGRESS_STATUS = "IN PROGRESS";
var DONE_STATUS = "DONE";

Template.dashboard.created = function(){
	console.log('dashboard template')
};

Template.dashboard.update = function(){
	console.log('updated');
};

Template.dashboard.destroyed = function(){
	console.log('destroyed');
};


Template.dashboard.helpers({

});

Template.dashboard.events({

  // CREATE
  'click .create_button': function(event, template) {

    var newTitle = template.find('.title_input').value;
    var newDescription = template.find('.description_input').value;
    var newStatus = DEFAULT_STATUS;

    if(title === "" && description === "") {

      return;
    }

    TasksCollection.insert({

      title: newTitle,
      description: newDescription,
      status: newStatus,
      show: true,
      created_at: Date.now()
    });

    template.find('.title_input').value = "";
    template.find('.description_input').value = "";
  },

  //UPDATE Title/Description
  'click .update_button': function(event, template) {

    event.preventDefault();

    var newTitle = template.find('.title_input').value;
    var newDescription = template.find('.description_input').value;

    if(newTitle === "" && newDescription === "") {

      return;
    }

    if(newTitle === "") {

      TasksCollection.update(this._id,{ description: newDescription});

    } else if(newDescription === "") {

      TasksCollection.update(this._id,{ title: newTitle});

    } else {

      TasksCollection.update(this._id,{title: newTitle,description:newDescription});
    }

    template.find('.title_input').value = "";
    template.find('.description_input').value = "";
  },

  //UPDATE status LEFT
  'click .left_button': function(event, template) {

    event.preventDefault();

    if(this.status === IN_PROGRESS_STATUS) {

      TasksCollection.update(this._id, {status: TO_DO_STATUS});

    } else if(this.status === DONE_STATUS) {

      TasksCollection.update(this._id, {status: IN_PROGRESS_STATUS});
    }
  },

  //UPDATE status RIGHT
  'click .right_button': function(event, template) {

    event.preventDefault();

    if(this.status === "TO_DO_STATUS") {

      TasksCollection.update(this._id, {status: IN_PROGRESS_STATUS});

    } else if(this.status === IN_PROGRESS_STATUS) {

      TasksCollection.update(this._id, {status: DONE_STATUS});
    }

  },

  //DELETE
  'click .delete_button': function(event, template) {

    event.preventDefault();

    TasksCollection.remove(this._id);
  }

});

