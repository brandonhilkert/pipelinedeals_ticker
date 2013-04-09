App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
  // adapter: DS.RESTAdapter.extend({
  //   url: 'http://localhost:3000/api/v3'
  // })
});

App.Deal = DS.Model.extend({
  name: DS.attr('string')
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return App.Deal.find();
  }
});

App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    // Add active class to first item
    this.$().find('.item').first().addClass('active');
    this.$().find('.carousel').carousel({interval: 5000});
  }
});
