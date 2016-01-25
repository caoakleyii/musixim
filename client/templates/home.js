Template.home.onRendered(function(){
  if(!Meteor.user()) {
    $('body').addClass('sign-in-body');
  } else {
    $('body').removeClass('sign-in-body');
  }
});
