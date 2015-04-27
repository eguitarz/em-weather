export default DS.Adapter.extend({
  host: 'http://autocomplete.wunderground.com',
  find: function (store, type, id) {
    return $.getJSON(this.host + '/aq?query=' + id);
  },
  findAll: function (store, type, id) {
    // return $.getJSON(this.host + '/aq?query=' + id);
    return [{id: 1, name: 'Edmonton'}];
  }
});