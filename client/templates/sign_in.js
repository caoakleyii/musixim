Template.sign_in.onRendered(function(){
  $('body').addClass('sign-in-body');
});

Template.sign_in.events({
  "click .btn-signin" : function(event) {
    event.preventDefault();

    var scopes = ['user-read-email'];
    var options = {
       showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
       requestPermissions: scopes  // Spotify access scopes.
     };

    Meteor.loginWithSpotify(options, function(accessToken) {
      // user is signed in
      // do things on sign in
      // console.log(Meteor.user());
      // Router.go('/home')
    });
  }
});
