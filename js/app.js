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

App.Router.map(function() {
  this.resource('start', { path: '/' });
  this.resource('deals');
});

App.DealsRoute = Ember.Route.extend({
  model: function() {
    // return App.Deal.getWonFor(localStorage.apiKey);
    return App.Deal.find();
  }
});

App.StartController = Ember.ObjectController.extend({
  apiKey: "",
  getDeals: function () {
    localStorage.setItem('apiKey', this.apiKey)
    this.transitionToRoute('deals');
  }
});

App.DealsView = Ember.View.extend({
  didInsertElement: function() {
    // Add active class to first item
    this.$().find('.item').first().addClass('active');
    this.$().find('.carousel').carousel({interval: 1000});
  }
});
