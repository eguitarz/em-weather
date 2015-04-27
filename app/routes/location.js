import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON('api/weather/' + params.location).then(function(data) {
      data.locationId = params.location;

      return data;
    });
  },
  setupController: function(controller, model) {
    controller.set('model', {locationName: model.locationName, locationId: model.locationId});
    this.controllerFor('days').set('model', model.weatherHistory);
  }
});
