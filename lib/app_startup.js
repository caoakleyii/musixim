Meteor.startup(function(){
  if (Meteor.settings.production) {
    Meteor.absoluteUrl.defaultOptions.rootUrl = "http://musixim.com";
  }
});
