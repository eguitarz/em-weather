import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'datepicker',

  setUpDatePicker: function() {
    var self = this,
        start = this.get('start'),
        end = this.get('end'),
        selectedDate = null;

    this._initDatePickers();

    if (start) {
      selectedDate = new Date(start*1000);
      this.$('#fromDate').datepicker('setDate', selectedDate);
      self.$( "#toDate" ).datepicker( "option", "minDate", selectedDate );
    }

    if (end) {
      selectedDate = new Date(end*1000);
      this.$('#toDate').datepicker('setDate', selectedDate);
      self.$( "#fromDate" ).datepicker( "option", "maxDate", selectedDate );
    }
  }.on('didInsertElement'),

  _initDatePickers: function() {
    var self = this;
    this.$('#fromDate').datepicker({
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        self.$( "#toDate" ).datepicker( "option", "minDate", selectedDate );
        // use noon to pick up the start time
        var noon = Math.floor(self.$( "#fromDate" ).datepicker('getDate').getTime()/1000) + 43200;
        self.sendAction('setStartAt', noon);
      }
    });

    this.$( "#toDate" ).datepicker({
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        self.$( "#fromDate" ).datepicker( "option", "maxDate", selectedDate );
        // use noon to pick up the end time
        var noon = Math.floor(self.$('#toDate').datepicker('getDate').getTime()/1000) + 43200;
        self.sendAction('setEndAt', noon);
      }
    });
  },

  willDestroyElement: function(){
    console.log('will destroy datepicker');
  }

});