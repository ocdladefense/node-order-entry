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
  return false;
  var mainElementId = props.recordId;
  var noteOrderItemString = " .order-item-note" + props.whichNotes;
  var noteButtonString = " .noteButton" + props.whichNotes;
  var noteOrderItem = document.querySelector(".id-" + mainElementId + noteOrderItemString);
  var noteButton = document.querySelector(".id-" + mainElementId + noteButtonString);
  console.log(noteButton); //console.log(".id-" + mainElementId + noteButtonString);

  if (noteOrderItem) {
    if (noteOrderItem.classList.contains("hidden")) {
      document.querySelector(".id-" + mainElementId + " .notNotes").classList.add("hidden");
      makeNotesHidden(mainElementId);
      noteButton.classList.remove("styled-active");
      noteButton.classList.add("styled-inactive");
      noteOrderItem.classList.remove("hidden");
    } else {
      document.querySelector(".id-" + mainElementId + " .notNotes").classList.remove("hidden");
      makeNotesHidden(mainElementId);
    }
  }
}

function makeNotesHidden(mainElementId) {
  document.querySelector(".id-" + mainElementId + " .noteButton1").classList.remove("styled-inactive");
  document.querySelector(".id-" + mainElementId + " .noteButton2").classList.remove("styled-inactive");
  document.querySelector(".id-" + mainElementId + " .noteButton3").classList.remove("styled-inactive");
  document.querySelector(".id-" + mainElementId + " .noteButton1").classList.add("styled-active");
  document.querySelector(".id-" + mainElementId + " .noteButton2").classList.add("styled-active");
  document.querySelector(".id-" + mainElementId + " .noteButton3").classList.add("styled-active");
  document.querySelector(".id-" + mainElementId + " .order-item-note1").classList.add("hidden");
  document.querySelector(".id-" + mainElementId + " .order-item-note2").classList.add("hidden");
  document.querySelector(".id-" + mainElementId + " .order-item-note3").classList.add("hidden");
}