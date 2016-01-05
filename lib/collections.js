Genres = new Mongo.Collection('genres');

Genre = function(){
  this.name = "";
  this.avatar = "";
  this.subGenre = [];
};

Meteor.startup(function() {
  if (Meteor.isServer) {

    // remove any existing genres on start up.
    Genres.remove({});

    // seed our database with genres.
    var edm = new Genre();
    edm.name = "EDM";
    edm.avatar = "images/edm.jpg";

    var rnb = new Genre();
    rnb.name = "R&B";
    rnb.avatar = "images/rnb.jpg";

    var hiphop = new Genre();
    hiphop.name = "Hip Hop & Rap";
    hiphop.avatar = "images/hiphop.jpg";

    var country = new Genre();
    country.name = "Country";
    country.avatar = "images/country.jpg";

    var pop = new Genre();
    pop.name = "Pop";
    pop.avatar = "images/pop.jpg";

    var genres = [edm, rnb, hiphop, country, pop];

    // insert all genres into the collection.
    _.each(genres, function(genre){
      Genres.insert(genre);
    });
  }

});
