Meteor.startup(function(){
  if (Meteor.settings.public.production) {
    Meteor.absoluteUrl.defaultOptions.rootUrl = "http://musixim.com";
  }
});
