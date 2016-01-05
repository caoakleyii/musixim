Meteor.publish('genres', function() {
  return Genres.find({});
});
