/** @jsx vNode */


/**

This is our list of components to be used in the app.

**/



export { EventListFull, EventFull, EventList, EventSearch };


import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';

import { cityFormatter, stateFormatter, createMemberX } from './contactFieldFormat.js';




const EventListFull = function(props) {
    return(
        <div>
            <EventSearch searchBar={props.searchBar} datesChecked={props.datesChecked} contactsChecked={props.contactsChecked} /> 
            <EventList events={props.events} />
        </div>
    )
};

const EventSearch = function(props) {
    let searchBar = props.searchBar;
    let datesChecked = props.datesChecked;
    let contactsChecked = props.contactsChecked;

    return (
        <div class="flex-parent object-list" id="searchArea">
            <h1>My Object</h1>

						<h3>Recent records</h3>

            <h3>Record search</h3>
            <div class="form-item">
            	<input type="text" id="record-search" placeholder="Enter search terms..." value={searchBar} />
            </div>
            
            <div class="form-item">
            	<input type="button" id="submit-search" data-action="search" value="search" />
            </div>

            <div class="form-item">
            	<label>Dates from Oldest to Newest</label>
            	<input type="checkbox" id="date-checkbox" checked={datesChecked ? true : null} />
            </div>
            
            <div class="form-item">
            	<label>Number of Attendees from Highest to Lowest</label>
            	<input type="checkbox" id="contacts-checkbox" checked={contactsChecked ? true : null} />
						</div>
						
        </div>
    )
};

const EventList = function(props) {
    let events = props.events;

    let list = [];
    for (let i = 0; i < events.length; i++) {
        list.push(<EventListItem event={events[i]} />);
    }

    return (
        <div class="flex-parent record-list" id="record-list-3">
            {list}
        </div>
    )
};

const EventListItem = function(props) {
    
    // let theCount = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
    // theCount = CACHE.get("eventsContactCount")[props.event.Id] ? theCount : "None";
    let theCount = "5";
    
    return (
        <div class="record-list-item">
            <h3><a class="record-button record-button-2" href={"#" + props.event.Id} data-action="details" data-event-id={props.event.Id}>{props.event.Name}</a></h3>
            <p>{props.event.Banner_Location_Text__c}</p>
            <p>{props.event.Start_Date__c}</p>
            <p>Attendees: {theCount}</p>
        </div>
    )
};

const EventFull = function(props) {
    return(
        <div>
            <EventDetails event={props.event} />
        </div>
    )
};

const EventDetails = function(props) {
    let event = props.event;

    return (
        <div>
            <h1 class="margin-maker-2">
                {event.Name}
            </h1>
            <h3 class="margin-maker">
                {event.Start_Date__c}
            </h3>
            <a href={"https://ocdla.force.com/OcdlaEvent?id=" + event.Id} target="_blank" class="margin-maker">
                Link to the event page in more detail.
            </a>
        </div>
    )
};


const ContactList = function(props) {
    let contacts = props.contacts;

    let attendees = [];
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].Contact__r != null) {
            attendees.push(<Attendee contact={contacts[i]} />);
        }
    }

    return (
        <div class="flex-parent contact-list" id="contactList3">
            <br />
            <h3>List of Attendees</h3>
            <p>An X by the name indicates membership.</p>
            <ul class="table-row should-be-invisible table-headers">
                <li class="table-cell">Name</li>
                <li class="table-cell">Order Date</li>
                <li class="table-cell">Ticket Type</li>
                <li class="table-cell">Location</li>
            </ul>
            {attendees}
        </div>
    )
};

const Attendee = function(props) {

    let contact = props.contact;

    return (
        <ul class="table-row">
            <li class="table-cell attendee-name">{contact.Contact__r.Name + createMemberX(contact.Contact__r.Ocdla_Current_Member_Flag__c)}</li>
            <li class="table-cell attendee-order-date">{contact.Order.EffectiveDate}</li>
            <li class="table-cell attendee-ticket-name">{contact.Product2.Name}</li>
            <li class="table-cell attendee-city">{(contact.Contact__r.MailingCity ?? ' ') + stateFormatter(contact.Contact__r.MailingState)}</li>
        </ul>
    )
};
