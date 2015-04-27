export default Ember.Controller.extend({
  date: function() {
    return this.get('model.daily.data')[0].time;
  }.property('model.daily.data'),

  temperature: function() {
    var min = this.get('model.daily.data')[0].temperatureMin;
    var max = this.get('model.daily.data')[0].temperatureMax;
    return Math.floor(min + max) / 2;
  }.property('model.daily.data'),

  rainfallPercent: function() {
    var intensity = this.get('model.daily.data')[0].precipIntensity;
    return Math.ceil(intensity * 10000 / 2).toFixed(2) % 100;
  }.property('model.daily.data'),

  icon: function() {
    var icon = 'wi-day-sunny'
    switch(this.get('model.daily.data')[0].icon) {
      case 'clear-day':
        icon = 'wi-day-sunny';
        break;
      case 'clear-night':
        icon = 'wi-night-clear';
        break;
      case 'rain':
        icon = 'wi-rain';
        break;
      case 'snow':
        icon = 'wi-snow';
        break;
      case 'sleet':
        icon = 'wi-sleet';
        break;
      case 'wind':
        icon = 'wi-day-windy';
        break;
      case 'fog':
        icon = 'wi-day-fog';
        break;
      case 'cloudy':
        icon = 'wi-day-cloudy';
        break;
      case 'partly-cloudy-day':
        icon = 'wi-day-cloudy';
        break;
      case 'partly-cloudy-night':
        icon = 'wi-night-cloudy';
        break;
    }

    return 'wi ' + icon;

  }.property('model.daily.data'),

  rainfallStyle: function() {
    return ('height:' + this.get('rainfallPercent') + '%').htmlSafe();
  }.property('rainfallPercent')
});