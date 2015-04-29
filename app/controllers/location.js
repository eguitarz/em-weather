/*global Ember */
export default Ember.Controller.extend({
  needs: ['days', 'application'],

  application: Ember.computed.alias('controllers.application'),

  days: Ember.computed.alias('controllers.days'),

  queryParams: ['start', 'end'],

  isSetUpDateRange: function() {
    var start = this.get('start'),
        end = this.get('end');
    return start !== null && start !== undefined && end !== null && end !== undefined;

    // do not observe query param, there is a bug in ember might cause quey param updates twice a time
  }.property('startTime', 'endTime'),

  query: function() {
    var self = this;

    if (this.get('isSetUpDateRange') === true) {

      Ember.$.getJSON('api/weather/' + this.get('model.locationId') + '?start='+ this.get('start') + '&end=' + this.get('end'))
        .then(function(data) {
        var days = self.get('days');
        days.clear().pushObjects(data.weatherHistory);
        self.get('application').set('backgroundImage', data.background.photos[0].image_url);
      });
    }
  }.observes('isSetUpDateRange'),

  actions: {
    setStartAtHandler: function(time) {
      this.set('start', time);
      this.set('startTime', time);
    },
    setEndAtHandler: function(time) {
      this.set('end', time);
      this.set('endTime', time);
    }
  }
});