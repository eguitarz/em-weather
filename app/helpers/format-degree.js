import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(degree) {
  return new Ember.Handlebars.SafeString(parseInt(degree, 10).toFixed(0));
});
