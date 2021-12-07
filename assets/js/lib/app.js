/** @jsx vNode */
import { vNode, addEvent, getMainContainer, changeMainContainer, myAppEventHandler, render } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js';
import { getOrders, getOrderById, getOrderItems } from './data.js';
import { HomeFullNode } from './components.js';
import { switchOrder } from './events.js';
import { saveOrderItem, setUpAutoComplete } from './savedata.js';

function init() {
  // Probably change to document.querySelector().
  changeMainContainer("main");
  var theList = getOrders();
  Promise.all([theList]).then(function (data) {
    CACHE.set("orders", data[0]);
    var initTree = vNode(HomeFullNode, {
      orders: data[0]
    });
    HISTORY.clear();
    HISTORY.set(0, initTree);
    render(getMainContainer(), initTree);
  });
  document.addEventListener("click", myAppEventHandler);
  document.addEventListener("change", myAppEventHandler);
}
/*
addEvent("search", function() {
    let stringEntered = document.getElementById("searchBar").value;
    let orderDatesAcs = document.getElementById("dateCheckBox").checked;
    let orderAttendeesDesc = document.getElementById("contactsChecked").checked;

    return doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc);
});
addEvent("list", switchToList);
*/


addEvent("loadorder", switchOrder, setUpAutoComplete); //document.add-event-listener(load-order)

addEvent("save-order-item", saveOrderItem, function () {
  setUpAutoComplete();
});
domReady(init);