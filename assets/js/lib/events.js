/** @jsx vNode */
export { switchToList, switchToDetails, doSearch };
import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { EventListFull, EventFull, EventList, EventSearch } from './components.js';
import { getEvents, getEventDetails, getRegistrants, getCountRegistrants } from './data.js';

function switchToDetails(id) {
  var event = getEventDetails(id); // let contacts = getRegistrants(id);

  return Promise.all([event]).then(function (data) {
    document.getElementById("switchButton").classList.value = "switchButton";
    return vNode(EventFull, {
      event: data[0]
    }); // contacts={data[1]} />;
  });
}

function switchToList() {
  document.getElementById("switchButton").classList.value = "hiddenButton"; // Need to change this function call to getLast();

  return Promise.resolve(HISTORY.getRecent(1));
}

function doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc) {
  var cached = CACHE.get("events");
  var copied = JSON.parse(JSON.stringify(cached));
  var results = copied.filter(function (event) {
    return doesEventFit(event, stringEntered);
  });

  if (orderDatesAcs == true) {
    results.sort(oldestToNewestSort);
  }

  if (orderAttendeesDesc == true) {
    results.sort(contactsHighestToLowest);
  }

  var virtualNodes = vNode("div", null, vNode(EventListFull, {
    events: results,
    searchBar: stringEntered,
    datesChecked: orderDatesAcs,
    contactsChecked: orderAttendeesDesc
  }));
  return Promise.resolve(virtualNodes);
}

function doesEventFit(testedEvent, stringEntered) {
  if (testedEvent.Name && testedEvent.Name.toLowerCase().includes(stringEntered.toLowerCase()) || testedEvent.Banner_Location_Text__c && testedEvent.Banner_Location_Text__c.toLowerCase().includes(stringEntered.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

function oldestToNewestSort(a, b) {
  if (a.Start_Date__c < b.Start_Date__c) {
    return -1;
  }

  if (a.Start_Date__c > b.Start_Date__c) {
    return 1;
  } else {
    return 0;
  }
}

function contactsHighestToLowest(a, b) {
  var count = CACHE.get("eventsContactCount");
  var aCount = count[a.Id] && count[a.Id].expr0;
  var bCount = count[b.Id] && count[b.Id].expr0;

  if (!aCount && !bCount) {
    return 0;
  }

  if (!aCount) {
    return 1;
  }

  if (!bCount) {
    return -1;
  }

  if (aCount > bCount) {
    return -1;
  }

  if (aCount < bCount) {
    return 1;
  }

  if (aCount == bCount) {
    return 0;
  }
}