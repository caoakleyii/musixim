
Template.header.helpers({
  create: function(){

  },
  rendered: function(){
  },
  destroyed: function(){

  },
  /*
  * Retrieves the current users spotify profile picture if they have one otherwise
  * returns an empty string.
  *
  */
  profilePicture : function(){
    if (Meteor.user() && Meteor.user().profile.images.length > 0) {
      return Meteor.user().profile.images[0].url;
    }
    return "";
  }
});

Template.header.events({
  /*
  * Signs the user into the meteor accounts db using their spotify account.
  *
  * @param {object} Event - The window event object passed to the event handler
  * @param {object} Template - The instance of the template where the event fired.
  */
  "click #spotify-sign-in": function(event, template){
    var scopes = ['user-read-email'];
    var options = {
       showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
       requestPermissions: scopes  // Spotify access scopes.
     };

     Meteor.loginWithSpotify(options, function(accessToken) {
       // user is signed in
       // do things on sign in
       // console.log(Meteor.user());
     });
  }
});
