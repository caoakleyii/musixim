
Template.header.helpers({
  create: function(){

  },
  rendered: function(){
  },
  destroyed: function(){

  },
});

Template.header.events({
  "click #spotify-sign-in": function(event, template){
    var scopes = ['user-read-email'];
    var options = {
       showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
       requestPermissions: scopes  // Spotify access scopes.
     };


     Meteor.loginWithSpotify(options, function(accessToken) {


       console.log(Meteor.user());

     });
  }
});
