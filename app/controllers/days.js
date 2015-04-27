export default Ember.ArrayController.extend({
  sunnyPercent: function() {
    var sunnyDays = this.filter(function(day) {
      if (day.daily.data && day.daily.data.length > 0) {
        var summary = day.daily.data[0].summary.toLowerCase();
        return summary.indexOf('clear') >= 0 || summary.indexOf('cloudy') >= 0;
      } else {
        return false;
      }
    }).length;

    return (sunnyDays / this.get('length')).toFixed(4)*100;
  }.property('@each')
});