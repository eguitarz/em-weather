import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:location', {
  needs: ['controller:days', 'controller:application']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('it set start and end time', function(assert) {
  assert.expect(5);

  var controller = this.subject(),
  time = 1430291309;

  assert.equal(controller.get('start'), null);
  assert.equal(controller.get('end'), null);

  controller.send('setStartAtHandler', time);
  assert.equal(controller.get('start'), time);

  controller.send('setEndAtHandler', time);
  assert.equal(controller.get('end'), time);

  assert.equal(controller.get('isSetUpDateRange'), true);
});