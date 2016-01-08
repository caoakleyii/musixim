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
    var topHits = new Genre();
    topHits.name = "Top List";
    topHits.avatar = "images/top_list.jpg";
    topHits.spotifyName = "toplists";

    var edm = new Genre();
    edm.name = "EDM";
    edm.avatar = "images/edm.jpg";
    edm.spotifyName = "edm_dance";

    var rnb = new Genre();
    rnb.name = "R&B";
    rnb.avatar = "images/rnb.jpg";
    rnb.spotifyName = "rnb";

    var hiphop = new Genre();
    hiphop.name = "Hip Hop & Rap";
    hiphop.avatar = "images/hiphop.jpg";
    hiphop.spotifyName = "hiphop";

    var country = new Genre();
    country.name = "Country";
    country.avatar = "images/country.jpg";
    country.spotifyName = "country";

    var pop = new Genre();
    pop.name = "Pop";
    pop.avatar = "images/pop.jpg";
    pop.spotifyName = "pop";

    var party = new Genre();
    party.name = "Party";
    party.avatar = "images/party.jpg"
    party.spotifyName = "party";

    var workout = new Genre();
    workout.name = "Workout";
    workout.avatar = "images/workout.jpg";
    workout.spotifyName = "workout";

    var indieAlt = new Genre();
    indieAlt.name = "Indie/Alternative";
    indieAlt.avatar = "images/indie_alt.jpg";
    indieAlt.spotifyName = "indie_alt";

    var rock = new Genre();
    rock.name = "Rock";
    rock.avatar = "images/rock.jpg";
    rock.spotifyName = "rock";

    var trending = new Genre();
    trending.name = "Trending";
    trending.avatar = "images/trending.jpg";
    trending.spotifyName = "popculture";


    var genres = [trending, topHits, edm, rnb, rock, hiphop, indieAlt, party, country, pop, workout];

    // insert all genres into the collection.
    _.each(genres, function(genre){
      Genres.insert(genre);
    });
  }

});
