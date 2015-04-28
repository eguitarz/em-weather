import Ember from 'ember';
import dasherizer from "weather/utils/dasherizer";

export default Ember.Route.extend({
  actions: {
    transitionToSearchedLocationHandler: function (location, start, end) {
      console.log("transitionToSearchedLocationHandler:" + location + ", start: " + start + ", end: " + end);
      var serializeLocation = dasherizer(location);
      this.transitionTo('location', serializeLocation, {queryParams: {start: start, end: end}});
    }
  }
});
