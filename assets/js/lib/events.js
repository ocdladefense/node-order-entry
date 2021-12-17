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
  //this could be dynamically done instead of hard coding in 1, 2, and 3
  var Id = props.recordId;

  if (props.whichNotes == 1) {
    var mainElementId = Id;
    var note1 = document.querySelector(".id-" + mainElementId + " .order-item-note1");

    if (note1.classList.contains("hidden")) {
      document.querySelector(".id-" + mainElementId + " .notNotes").classList.add("hidden");
      makeNotesHidden(mainElementId);
      document.querySelector(".id-" + mainElementId + " .noteButton1").classList.remove("styled-active");
      document.querySelector(".id-" + mainElementId + " .noteButton1").classList.add("styled-inactive");
      document.querySelector(".id-" + mainElementId + " .order-item-note1").classList.remove("hidden");
    } else {
      document.querySelector(".id-" + mainElementId + " .notNotes").classList.remove("hidden");
      makeNotesHidden(mainElementId);
    }
  } else if (props.whichNotes == 2) {
    var _mainElementId = Id;
    var note2 = document.querySelector(".id-" + _mainElementId + " .order-item-note2");

    if (note2.classList.contains("hidden")) {
      document.querySelector(".id-" + _mainElementId + " .notNotes").classList.add("hidden");
      makeNotesHidden(_mainElementId);
      document.querySelector(".id-" + _mainElementId + " .noteButton2").classList.remove("styled-active");
      document.querySelector(".id-" + _mainElementId + " .noteButton2").classList.add("styled-inactive");
      document.querySelector(".id-" + _mainElementId + " .order-item-note2").classList.remove("hidden");
    } else {
      document.querySelector(".id-" + _mainElementId + " .notNotes").classList.remove("hidden");
      makeNotesHidden(_mainElementId);
    }
  } else if (props.whichNotes == 3) {
    var _mainElementId2 = Id;
    var note3 = document.querySelector(".id-" + _mainElementId2 + " .order-item-note3");

    if (note3.classList.contains("hidden")) {
      document.querySelector(".id-" + _mainElementId2 + " .notNotes").classList.add("hidden");
      makeNotesHidden(_mainElementId2);
      document.querySelector(".id-" + _mainElementId2 + " .noteButton3").classList.remove("styled-active");
      document.querySelector(".id-" + _mainElementId2 + " .noteButton3").classList.add("styled-inactive");
      document.querySelector(".id-" + _mainElementId2 + " .order-item-note3").classList.remove("hidden");
    } else {
      document.querySelector(".id-" + _mainElementId2 + " .notNotes").classList.remove("hidden");
      makeNotesHidden(_mainElementId2);
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