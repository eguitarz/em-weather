import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(timeInSeconds) {
  var monthTable = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  DayTable = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  time = new Date(timeInSeconds * 1000),
  date = time.getDate(),
  day = DayTable[time.getDay()],
  month = monthTable[time.getMonth()];
  return new Ember.Handlebars.SafeString(day + ', ' + month + ' ' + date);
});
