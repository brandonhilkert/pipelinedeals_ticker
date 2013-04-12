App = Ember.Application.create();

App.Adapter = DS.RESTAdapter.extend({
  url: 'http://localhost:3000/api/v3'
});

App.Adapter.map('App.Deal', {
  user: {embedded: 'load'},
  company: {embedded: 'load'}
});

App.User = DS.Model.extend({
  full_name: DS.attr('string')
});

App.Company = DS.Model.extend({
  name: DS.attr('string')
});

App.Deal = DS.Model.extend({
  name: DS.attr('string'),
  valueInCents: DS.attr('number'),
  closedTime: DS.attr('date'),
  user: DS.belongsTo(App.User, {embedded: 'load'}),
  company: DS.belongsTo(App.Company, {embedded: 'load'}),

  findWonId: function () {
    console.log('asdf')

  }
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: App.Adapter
});

App.Deal.FIXTURES = [
  {id: 1, name: 'Deal 1', closed_time: '2012-09-01', value_in_cents: 342345, company: { id: 1, name: 'Google' }, user: { id: 3, full_name: 'Brandon Hilkert' } },
  {id: 2, name: 'Deal 2', closed_time: '2013-04-01', value_in_cents: 82345, company: { id: 2, name: 'Apple' }, user: { id: 2, full_name: 'Bob Smith' } },
  {id: 3, name: 'Deal 3', closed_time: '2013-02-01', value_in_cents: 1500000, company: { id: 3, name: 'Wegman\'s' }, user: { id: 2, full_name: 'Bob Smith' } }
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
  model: function(params) {
    return App.Deal.find({
      api_key: this.modelFor('api'),
      per_page: 10
    });
    // return App.Deal.find();
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
    this.$().find('.carousel').carousel({interval: 3000});
  }
});

Ember.Handlebars.registerBoundHelper('formatCurrency', function(value) {
  return accounting.formatMoney(value/100);
});
Ember.Handlebars.registerBoundHelper('formatDate', function(value) {
  return moment(value).fromNow();
});
