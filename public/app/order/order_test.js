import 'steal-qunit';
import Order from 'app/models/order';
import { ViewModel } from './order';
import AppState from '../appstate';

QUnit.module('Order ViewModel');

test('Default order is initialized', () => {
  let vm = new ViewModel();
  ok(vm.attr('order') instanceof Order);
});

test('Adding and removing menu items to the order', () => {
  let vm = new ViewModel({
    slug: 'spago',
    restaurant: {
      "menu": {
        "lunch": [{
          "name": "Spinach Fennel Watercress Ravioli",
          "price": 35.99
        }]
      }
    }
  });
  let item = vm.attr('restaurant.menu.lunch.0');

  vm.select(item, true);
  equal(vm.attr('order.items.0'), item, 'Item added to order');
  vm.select(item, false);
  equal(vm.attr('order.items.length'), 0, 'Item removed from order')
});

asyncTest('Setting slug gets a restaurant and it is added to order', () => {
  let vm = new ViewModel({ slug: 'spago', '@root': new AppState() });
  let deferred = vm.attr('restaurant');

  deferred.then(restaurant => {
    equal(restaurant.attr('name'), 'Spago', 'Got expected restaurant');
    equal(vm.attr('order.restaurant'), restaurant.attr('_id'),
      'Restaurant set on order');
    start();
  });
});
