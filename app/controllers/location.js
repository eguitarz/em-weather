/*global Ember */
export default Ember.Controller.extend({
  needs: ['days'],

  days: Ember.computed.alias('controllers.days'),

  queryParams: ['start', 'end'],

  isSetUpDateRange: function() {
    var start = this.get('start'),
        end = this.get('end');
    return start !== null && start !== '' && end !== null && end !== '';
  }.property('start,end'),

  query: function() {
    var self = this;

    if (this.get('isSetUpDateRange') === true) {

      Ember.$.getJSON('api/weather/' + this.get('model.locationId') + '?start='+ this.get('start') + '&end=' + this.get('end'))
        .then(function(data) {
        var days = self.get('days');
        days.clear();
        days.pushObjects(data.weatherHistory);
        self.controllerFor('application').set('backgroundImage', data.background.photos[0].image_url);
      });
    }
  }.observes('isSetUpDateRange'),

  actions: {
    setStartAt: function(time) {
      this.set('start', time);
      this.get('isSetUpDateRange'); // Every observed property has to be 'get' at least once
    },
    setEndAt: function(time) {
      this.set('end', time);
      this.get('isSetUpDateRange'); // Every observed property has to be 'get' at least once
    }
  }
});