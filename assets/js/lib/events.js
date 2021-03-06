/** @jsx vNode */
export { switchOrder, toggleNotes };
import { vNode, updateElement, changeMainContainer } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { OrderItems, HomeFullNode } from './components.js';
import { getOrders, getOrderById, getOrderItems } from './data.js';
import { saveOrderItem, setUpAutoComplete } from './savedata.js';

function switchOrder(props) {
  //render just the right side, not everything
  changeMainContainer("main");
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

function toggleNotes(props) {
  var fieldClass = " .order-item-note-" + props.whichNotes;
  var buttonClass = " .note-button-" + props.whichNotes;
  var field = document.querySelector("#id-" + props.recordId + fieldClass);
  var button = document.querySelector("#id-" + props.recordId + buttonClass);

  if (!field) {
    return false;
  }

  var notNotes = document.querySelector(".id-" + props.recordId + " .not-notes").classList;

  if (field.classList.contains("displayed")) {
    notNotes.add("displayed");
    field.classList.remove("displayed");
    button.classList.remove("styled-inactive");
  } else {
    for (var i = 1; i <= 3; i++) {
      document.querySelector(".id-" + props.recordId + " .note-button-" + i).classList.remove("styled-inactive");
      document.querySelector(".id-" + props.recordId + " .order-item-note-" + i).classList.remove("displayed");
    }

    notNotes.remove("displayed");
    button.classList.add("styled-inactive");
    field.classList.add("displayed");
  }
}