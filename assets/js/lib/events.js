/** @jsx vNode */
export { switchOrder };
import { vNode, updateElement } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { OrderItems, HomeFullNode } from './components.js';
import { getOrders, getOrderById, getOrderItems } from './data.js';
import { saveOrderItem, setUpAutoComplete } from './savedata.js';

function switchOrder(props) {
  //render just the right side, not everything
  var theList = getOrders();
  var singleOrder = getOrderById(props.recordId);
  var orderItems = getOrderItems(props.recordId);
  var vNodes = Promise.all([orderItems, theList, singleOrder]).then(function (data) {
    console.log("promise finished"); //setUpAutoComplete();

    return vNode(HomeFullNode, {
      orders: data[1],
      order: data[2],
      orderItems: data[0]
    }); //return <OrderItems orders={data[1]} order={data[2]} orderItems={data[0]} />;
  }); //vNodes.then(setUpAutoComplete);

  return vNodes;
}