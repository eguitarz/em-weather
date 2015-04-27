export default Ember.Controller.extend({
  date: function() {
    return this.get('model.daily.data')[0].time;
  }.property('model.daily.data'),

  temperature: function() {
    return this.get('model.daily.data')[0].temperatureMin;
  }.property('model.daily.data'),

  rainfallPercent: function() {
    var intensity = this.get('model.daily.data')[0].precipIntensity;
    return Math.ceil(intensity * 10000 / 2).toFixed(2) % 100;
  }.property('model.daily.data'),

  rainfallStyle: function() {
    return ('height:' + this.get('rainfallPercent') + '%').htmlSafe();
  }.property('rainfallPercent')
});