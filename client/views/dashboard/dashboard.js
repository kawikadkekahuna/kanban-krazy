'use strict';

var DEFAULT_STATUS = "TO DO";
var TO_DO_STATUS = "TO DO";
var IN_PROGRESS_STATUS = "IN PROGRESS";
var DONE_STATUS = "DONE";

Template.dashboard.created = function(){

  // console.log($(document).foundation('accordion', 'reflow'));
  // console.log('reinstated flow');

  $(".details_div").hide();
};

Template.dashboard.update = function(){
	console.log('updated');
};

Template.dashboard.destroyed = function(){
	console.log('destroyed');
};


Template.dashboard.helpers({

  tasks_to_do:function(){
    return TasksCollection.find({status:"TO DO"});
  },

  tasks_in_progress:function(){
    return TasksCollection.find({status:"IN PROGRESS"});

  },
  tasks_done:function(){
    return TasksCollection.find({status:"DONE"});

  }

});

Template.dashboard.events({

  //DETAILS
  'click .taskTitle': function(event, template) {

    $('.details_div').toggle();
  },

  // CREATE
  'click .create_button': function(event, template) {

    $(document).foundation('accordion', 'reflow');

    // console.log(event);

    // var newTitl]e = template.find('.title_input').value;
    // var newDescription = template.find('.description_input').value;
    // var newStatus = DEFAULT_STATUS;

    // if(title === "" && description === "") {

    //   return;
    // }

    // TasksCollection.insert({

    //   title: newTitle,
    //   description: newDescription,
    //   status: newStatus,
    //   show: true,
    //   created_at: Date.now()
    // });

    // template.find('.title_input').value = "";
    // template.find('.description_input').value = "";
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

    switch(this.status){

      case TO_DO_STATUS:
      break;
      case IN_PROGRESS_STATUS:
        TasksCollection.update(this._id,{$set:{status: TO_DO_STATUS}});
      break;
      case DONE_STATUS:
        TasksCollection.update(this._id,{$set:{status: IN_PROGRESS_STATUS}});
      break
    }
  },

  //UPDATE status RIGHT
  'click .right_button': function(event, template) {

    event.preventDefault();
      switch(this.status){

      case TO_DO_STATUS:
        TasksCollection.update(this._id,{$set:{status: IN_PROGRESS_STATUS}});
      break;
      case IN_PROGRESS_STATUS:
        TasksCollection.update(this._id,{$set:{status: DONE_STATUS}});
      break;
      case DONE_STATUS:
      break;

    }

  },

  //DELETE
  'click .delete_button': function(event, template) {

    event.preventDefault();

    TasksCollection.remove(this._id);
  }

});