import Ember from 'ember';
import dasherizer from "weather/utils/dasherizer";

export default Ember.Route.extend({
  actions: {
    transitionToLocationHandler: function (location) {
      console.log("transitionToLocationHandler:" + location);
      // this.transitionTo('location', location.get('id'));
      this.transitionTo('location', location);
    },

    transitionToSearchedLocationHandler: function (location) {
      console.log("transitionToSearchedLocationHandler:" + location);
      var serializeLocation = dasherizer(location);
      this.transitionTo('location', serializeLocation);
    }
  }
});
