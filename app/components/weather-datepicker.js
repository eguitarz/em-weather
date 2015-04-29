import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'datepicker',

  setUpDatePicker: function() {
    var self = this;

    this.$('#fromDate').datepicker({
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        self.$( "#toDate" ).datepicker( "option", "minDate", selectedDate );
        // use noon to pick up the start time
        var time = Math.floor(self.$( "#fromDate" ).datepicker('getDate').getTime()/1000) + 43200;
        self.sendAction('setStartAt', time);
        console.log('send action setStartAt');
      }
    });

    this.$( "#toDate" ).datepicker({
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        self.$( "#fromDate" ).datepicker( "option", "maxDate", selectedDate );
        // use noon to pick up the end time
        var time = Math.floor(self.$('#toDate').datepicker('getDate').getTime()/1000) + 43200;
        self.sendAction('setEndAt', time);
        console.log('send action setEndAt');
      }
    });

    var start = this.get('start'),
        end = this.get('end');

    if (start) {
      this.$('#fromDate').datepicker('setDate', new Date(start*1000));
    }

    if (end) {
      this.$('#toDate').datepicker('setDate', new Date(end*1000));
    }
  }.on('didInsertElement'),

  willDestroyElement: function(){
    console.log('will destroy datepicker');
  }

});