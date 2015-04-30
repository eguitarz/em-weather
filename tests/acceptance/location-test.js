/*global jQuery */
/*global sinon */

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'weather/tests/helpers/start-app';

var application;

module('Acceptance: Location', {
  beforeEach: function() {
    $.mockjax({
      url: /api\/weather\/new_york.*/,
      proxy: '/fixtures/new-york.json'
    });

    $.mockjax({
      url: /api\/weather\/san_francisco.*/,
      proxy: '/fixtures/san-francisco.json'
    });

    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /location', function(assert) {
  visit('/location');

  andThen(function() {
    assert.equal(currentURL(), '/location/san_francisco');
  });
});

test('visiting /location/:location_id', function(assert) {
  visit('/location/new_york');

  andThen(function() {
    console.log(currentURL());
    assert.equal(find('h2').text(), 'New York City, New York');
  });
});
