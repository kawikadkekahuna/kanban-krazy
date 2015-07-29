'use strict';

var DEFAULT_STATUS = "TO DO";
var TO_DO_STATUS = "TO DO";
var IN_PROGRESS_STATUS = "IN PROGRESS";
var DONE_STATUS = "DONE";

var IS_DRAGGING = false;

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
  // },

  // task_id: function(task) {

  //   return TasksCollection.find({_id: this._id});
  // }

});

Template.dashboard.events({

  //DETAILS
  'click .taskTitle': function(event, template) {

    $(document).foundation('dropdown', 'reflow');
  },

  // CREATE
  'click .create_button': function(event, template) {


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
  },

  'click .submitButton ':function(event,template){

    event.preventDefault();
    var newTitle = template.find('.title_input').value;
    var newDescription = template.find('.description_input').value;
    var newStatus = DEFAULT_STATUS;

    console.log('newTitle',newTitle);
    console.log('newDescription',newDescription);
    $('input:radio:checked').each(function() {

    });


    if(newTitle === "" && newDescription === "") {

      return;
    }

    TasksCollection.insert({

      createdBy: Meteor.userId(),
      title: newTitle,
      description: newDescription,
      status: newStatus,
      show: true,
      created_at: Date.now()
    });

    console.log(TasksCollection.find().fetch().length);

    template.find('.title_input').value = "";
    template.find('.description_input').value = "";
  },

  'mouseover .task':function(){
  
    $('.task').draggable({snap:true});
  }

});

Template.dashboard.rendered = function(){
    $(document).foundation('accordion', 'reflow');

}