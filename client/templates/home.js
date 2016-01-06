
Template.home.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.home.events({
  "click #btn-jam-out": function(event, template){
    var genreList = Session.get('playlist');
    Router.go('radio', { genreList: genreList });
  }
});
