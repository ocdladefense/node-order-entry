/** @jsx vNode */

export { switchOrder, toggleNotes };

import { vNode, updateElement, changeMainContainer } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';


import { OrderItems, HomeFullNode }  from './components.js';
import { getOrders, getOrderById, getOrderItems } from './data.js';
import { saveOrderItem, setUpAutoComplete } from './savedata.js';


function switchOrder(props) {
    //render just the right side, not everything

    changeMainContainer("main");


    let theList = getOrders();
    let singleOrder = getOrderById(props.recordId);
    let orderItems = getOrderItems(props.recordId);
    
    let vNodes = Promise.all([orderItems, theList, singleOrder]).then(function(data) {
        console.log("promise finished");

        //setUpAutoComplete();
        return <HomeFullNode orders={data[1]} order={data[2]} orderItems={data[0]} />;
        //return <OrderItems orders={data[1]} order={data[2]} orderItems={data[0]} />;
    });
    //vNodes.then(setUpAutoComplete);
    return vNodes;
}

function toggleNotes(props) {
    //this could be dynamically done instead of hard coding in 1, 2, and 3
    let Id = props.recordId;
    if (props.whichNotes == 1) {
        let mainElementId = Id;

        let note1 = document.querySelector(".id-" + mainElementId + " .order-item-note1");
        
        if (note1.classList.contains("hidden")) {
            document.querySelector(".id-" + mainElementId + " .notNotes").classList.add("hidden");
            makeNotesHidden(mainElementId);
            document.querySelector(".id-" + mainElementId + " .noteButton1").classList.remove("styled-active");
            document.querySelector(".id-" + mainElementId + " .noteButton1").classList.add("styled-inactive");
            document.querySelector(".id-" + mainElementId + " .order-item-note1").classList.remove("hidden");
        }
        else {
            document.querySelector(".id-" + mainElementId + " .notNotes").classList.remove("hidden");
            makeNotesHidden(mainElementId);
        }
    }
    else if (props.whichNotes == 2) {
        let mainElementId = Id;

        let note2 = document.querySelector(".id-" + mainElementId + " .order-item-note2");
        
        if (note2.classList.contains("hidden")) {
            document.querySelector(".id-" + mainElementId + " .notNotes").classList.add("hidden");
            makeNotesHidden(mainElementId);
            document.querySelector(".id-" + mainElementId + " .noteButton2").classList.remove("styled-active");
            document.querySelector(".id-" + mainElementId + " .noteButton2").classList.add("styled-inactive");
            document.querySelector(".id-" + mainElementId + " .order-item-note2").classList.remove("hidden");
        }
        else {
            document.querySelector(".id-" + mainElementId + " .notNotes").classList.remove("hidden");
            makeNotesHidden(mainElementId);
        }
    }
    else if (props.whichNotes == 3) {
        let mainElementId = Id;

        let note3 = document.querySelector(".id-" + mainElementId + " .order-item-note3");
        
        if (note3.classList.contains("hidden")) {
            document.querySelector(".id-" + mainElementId + " .notNotes").classList.add("hidden");
            makeNotesHidden(mainElementId);
            document.querySelector(".id-" + mainElementId + " .noteButton3").classList.remove("styled-active");
            document.querySelector(".id-" + mainElementId + " .noteButton3").classList.add("styled-inactive");
            document.querySelector(".id-" + mainElementId + " .order-item-note3").classList.remove("hidden");
        }
        else {
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








