import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:location', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});

test('model is set', function(assert) {
  assert.expect(1);
  var route = this.subject();

  var promise = route.model({location: 'san_francisco', start: 1430288360, end: 1430288360});
  assert.equal(typeof promise.then, 'function');
});

test('setup controller: model', function(assert) {
  assert.expect(1);
  var route = this.subject();

  var fakeController = {
    set: function(property, object) {
      assert.equal(property, 'model');
    }
  };

  route._setModel(fakeController, {});
});