
Template.header.helpers({
  create: function(){

  },
  rendered: function(){
     console.log('hi');
  },
  destroyed: function(){

  },
});

Template.header.events({
  "click #spotify-sign-in": function(event, template){
    var options = {
       showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
       requestPermissions: ['user-read-email'] // Spotify access scopes.
     };
     Meteor.loginWithSpotify(options, function(err) {
       console.log(err || "No error");
     });
  }
});
