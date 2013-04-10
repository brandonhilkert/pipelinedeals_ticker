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

App.Deal.FIXTURES = [
  {id: 1, name: 'Deal 1'},
  {id: 2, name: 'Deal 2'},
  {id: 3, name: 'Deal 3'},
  {id: 4, name: 'Deal 4'},
  {id: 5, name: 'Deal 5'},
  {id: 6, name: 'Deal 6'},
  {id: 7, name: 'Deal 7'}
]

App.Router.map(function() {
  this.resource('start', { path: '/' });

  this.resource('api', { path: '/:api_key' }, function(){
    this.resource('deals');
  });
});

App.ApiRoute = Ember.Route.extend({
  model: function(params) {
    return params.api_key;
  }
});

App.DealsRoute = Ember.Route.extend({
  model: function() {
    // return App.Deal.getWonFor(this.modelFor('api'));
    return App.Deal.find();
  }
});

App.StartController = Ember.ObjectController.extend({
  apiKey: '',
  getDeals: function (model) {
    this.transitionToRoute('deals', this.apiKey);
  }
});

App.DealsView = Ember.View.extend({
  didInsertElement: function() {
    // Add active class to first item
    this.$().find('.item').first().addClass('active');
    this.$().find('.carousel').carousel({interval: 1000});
  }
});
