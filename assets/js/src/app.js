/** @jsx vNode */

import { vNode, addEvent, getMainContainer, changeMainContainer, myAppEventHandler } from '../../../node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';


import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js';

import { getEvents, getEventDetails, getRegistrants, getCountRegistrants } from './data.js';

import { EventListFull, EventFull } from './components.js';

import { switchToList, switchToDetails, doSearch } from './events.js';



function init() {
    // Probably change to document.querySelector().
    changeMainContainer("main");

    let theList = getEvents();


    Promise.all([theList]).then(function(data) {
        CACHE.set("events", data[0]);
        
        let initTree = <EventListFull events={data[0]} searchBar={""} datesChecked={false} contactsChecked={false} />;
        
        HISTORY.clear();
        HISTORY.set(0, initTree);
        render(getMainContainer(), initTree);
    });

    document.addEventListener("click", myAppEventHandler);
}

addEvent("search", function() {
    let stringEntered = document.getElementById("searchBar").value;
    let orderDatesAcs = document.getElementById("dateCheckBox").checked;
    let orderAttendeesDesc = document.getElementById("contactsChecked").checked;

    return doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc);
});
addEvent("list", switchToList);
addEvent("details", switchToDetails);


domReady(init);