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
  this.resource('deals', { path: '/deals/:api_key' });
});

App.DealsRoute = Ember.Route.extend({
  model: function(params) {
    // return App.Deal.getWonFor(params.api_key);
    return App.Deal.find();
  }
});

App.IndexController = Ember.ObjectController.extend({
  apiKey: "",
  getDeals: function () {
    this.transitionToRoute('deals', [this.apiKey]);
  }
});

App.DealsView = Ember.View.extend({
  didInsertElement: function() {
    // Add active class to first item
    this.$().find('.item').first().addClass('active');
    this.$().find('.carousel').carousel({interval: 1000});
  }
});
