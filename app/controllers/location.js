export default Ember.Controller.extend({
  needs: ['days'],

  days: Ember.computed.alias('controllers.days'),

  startAt: null,

  endAt: null,

  isSetUpDateRange: function() {
    return this.get('startAt') != null && this.get('endAt') != null;
  }.property('startAt,endAt'),

  query: function() {
    var self = this;

    if (this.get('isSetUpDateRange') === true) {
      console.log('Ready to query, startAt: ' + this.get('startAt') + ' endAt: ' + this.get('endAt'));

      Ember.$.getJSON('api/weather/' + this.get('model.locationId') + '?start='+ this.get('startAt') + '&end=' + this.get('endAt'))
        .then(function(data) {
        var days = self.get('days');
        days.clear();
        days.pushObjects(data.weatherHistory);
      });
    }
  }.observes('isSetUpDateRange'),

  actions: {
    setStartAt: function(time) {
      console.log('set startAt: ' + time);
      this.set('startAt', time);
      this.get('isSetUpDateRange'); // Every observed property has to be 'get' at least once
    },
    setEndAt: function(time) {
      console.log('set endAt: ' + time);
      this.set('endAt', time);
      this.get('isSetUpDateRange'); // Every observed property has to be 'get' at least once
    }
  }
});