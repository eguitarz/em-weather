import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:location', {
  needs: ['controller:days']
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

  controller.send('setStartAt', time);
  assert.equal(controller.get('start'), time);

  controller.send('setEndAt', time);
  assert.equal(controller.get('end'), time);

  assert.equal(controller.get('isSetUpDateRange'), true);
});