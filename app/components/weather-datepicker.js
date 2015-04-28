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

    var start = this.get('start'),
        end = this.get('end');

    if (start) {
      this.$('#fromDate').datepicker('setDate', new Date(start*1000));
    } else {
      this.$('#fromDate').datepicker('setDate', new Date());
    }

    if (end) {
      this.$('#toDate').datepicker('setDate', new Date(end*1000));
    } else {
      var oneWeekLater = new Date((new Date).getTime() + 864000 * 7);
      this.$('#toDate').datepicker('setDate', oneWeekLater);
    }
  }.on('didInsertElement'),

  willDestroyElement: function(){
    console.log('will destroy datepicker');
  }

});