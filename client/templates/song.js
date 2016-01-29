Template.song.onRendered(function() {
  if(!Meteor.user()) {
    $('body').addClass('sign-in-body');
  } else {
    $('body').removeClass('sign-in-body');
  }
  // create call to get track object from spotify
  // load into radio player -> createPlayer([track]);
});
