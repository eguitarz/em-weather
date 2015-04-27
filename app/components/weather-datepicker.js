import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'datepicker',

  setUpDatePicker: function() {
    var self = this;

    this.$('#fromDate').datepicker({
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#toDate" ).datepicker( "option", "minDate", selectedDate );
        // use noon to pick up the start time
        self.sendAction('setStartAt', Math.floor($( "#fromDate" ).datepicker('getDate').getTime()/1000) + 43200);
      }
    });

    this.$( "#toDate" ).datepicker({
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#fromDate" ).datepicker( "option", "maxDate", selectedDate );
        // use noon to pick up the end time
        self.sendAction('setEndAt', Math.floor($('#toDate').datepicker('getDate').getTime()/1000) + 43200);
      }
    });
  }.on('didInsertElement'),

  willDestroyElement: function(){
    console.log('will destroy datepicker');
  }

});