Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('landing');
  } else {
    this.next();
  }
});

Router.route('/')
	.get(function() {
		this.render('landing')
	});

Router.route('/dashboard')
	.get(function() {
		
		this.render('dashboard');

	});

Router.route('/register')
	.get(function(){
		this.render('register')
	})