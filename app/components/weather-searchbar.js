import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'search',
  placeholder: "Search the weather of location",

  setUpTypeahead: function() {
    var engine = new Bloodhound({
      remote: 'api/search/%QUERY',
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.name);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace
    });
    engine.initialize();

    var typeahead = this.$('input').typeahead(null, {
      name: 'searchTerm',
      displayKey: 'name',
      source: engine.ttAdapter()
    });

    var self = this;

    Ember.run(function () {
      self.$('input').focus();
    });

    typeahead.on("typeahead:selected", function(event, location) {
      Ember.run(function () {
        self.sendAction("transitionToLocation", location.name);
        console.log("sendAction transitionToLocation: " + location.name);
        self.resetValue();
        // self.resetList();
      });
    });

    typeahead.on("typeahead:autocompleted", function(event, location) {
      Ember.run(function () {
        self.sendAction("transitionToLocation", location.name);
        console.log("sendAction completed transitionToLocation: " + location.name);
        self.resetValue();
        // self.resetList();
      });
    });
  }.on('didInsertElement'),

  willDestroyElement: function(){
    console.log('will destroy typeahead');
    this.$('input:first').typeahead('destroy');
  },

  resetList: function(){
    this.$('.tt-dropdown-menu').empty();
  },

  resetValue: function(){
    this.$('input.tt-query').blur().val('');
  }

});