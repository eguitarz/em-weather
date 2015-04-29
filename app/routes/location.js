import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var query = '';
    if (params.start && params.end) {
      query = '?start=' + params.start + '&end=' + params.end;
    } else {
      var now = (new Date()).getTime()/1000,
          aWeekLater = now + 86400 * 6;
      query = '?start=' + now + '&end=' + aWeekLater;
    }

    return Ember.$.getJSON('api/weather/' + params.location + query).then(function(data) {
      data.locationId = params.location;

      return data;
    });
  },

  setupController: function(controller, model) {
    this._setModel(controller, {locationName: model.locationName, locationId: model.locationId});
    this._setWeatherHistory(model.weatherHistory);
    this._setBackgound(model.background);
    controller.get('isSetUpDateRange'); // Every observed property has to be 'get' at least once
  },

  _setModel: function(controller, content) {
    controller.set('model', content);
  },

  _setWeatherHistory: function(content) {
    this.controllerFor('days').set('model', content);
  },

  _setBackgound: function(content) {
    if (content && content.photos && content.photos.length > 0) {
      this.controllerFor('application').set('backgroundImage', content.photos[0].image_url);
    }
  }
});
