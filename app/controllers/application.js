/*global Ember */
export default Ember.Controller.extend({
  backgroundImage: null,
  backgroundStyle: function() {
    if (this.get('backgroundImage')) {
      return ('background-image:url(' + this.get('backgroundImage') + ')').htmlSafe();
    }
  }.property('backgroundImage')
});