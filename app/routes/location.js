import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var query = '';
    if (params.start && params.end) {
      query = '?start=' + params.start + '&end=' + params.end;
    }
    return Ember.$.getJSON('api/weather/' + params.location + query).then(function(data) {
      data.locationId = params.location;

      return data;
    });
  },
  setupController: function(controller, model) {
    controller.set('model', {locationName: model.locationName, locationId: model.locationId});
    this.controllerFor('days').set('model', model.weatherHistory);
    if (model.background && model.background.photos && model.background.photos.length > 0) {
      this.controllerFor('application').set('backgroundImage', model.background.photos[0].image_url);
    }
  }
});
