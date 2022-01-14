/** @jsx vNode */

import { vNode, addEvent, getMainContainer, changeMainContainer, myAppEventHandler, render } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';

import { getOrders, getOrderById, getOrderItems } from './data.js';
import { HomeFullNode } from './components.js';

import { switchOrder, toggleNotes } from './events.js';
import { saveOrderItem, setUpAutoComplete, addNewOrderItem, deleteOrderItem } from './savedata.js';



function init() {
    changeMainContainer("main");
    let theList = getOrders();

    Promise.all([theList]).then(function(data) {
        CACHE.set("orders", data[0]);
        
        let initTree = <HomeFullNode orders={data[0]} />;
        
        HISTORY.clear();
        HISTORY.set(0, initTree);
        render(getMainContainer(), initTree);
    });

    document.addEventListener("click", myAppEventHandler);
    document.addEventListener("change", myAppEventHandler);
}


addEvent("loadorder", switchOrder, setUpAutoComplete);
addEvent("save-order-item", saveOrderItem, setUpAutoComplete);
addEvent("toggle-notes", toggleNotes, setUpAutoComplete);
addEvent("add-order-item", addNewOrderItem, setUpAutoComplete);
addEvent("delete-order-item", deleteOrderItem, setUpAutoComplete);


addEvent("nothing", nothing);//Just in case, should be removed later on in a more finished version
function nothing() {
    console.log("nothing");
}


domReady(init);