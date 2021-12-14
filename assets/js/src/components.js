/** @jsx vNode */


/**

This is our list of components to be used in the app.

**/



export { HomeFullNode, OrderItems, OrderItem, SmallOrderList, LargeOrderList };


import { vNode } from '../../../node_modules/@ocdladefense/view/view.js';

import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';

import { switchOrder } from './events.js';


const HomeFullNode = function(props) {
    return(
        <div>
            <OrderDetailsSection orders={props.orders} order={props.order} orderItems={props.orderItems} /> 
            <div id="bottomListOrders">
                <LargeOrderList orders={props.orders} />
            </div>
        </div>
    )
};

const OrderDetailsSection = function(props) {
    return(
        <div>
            <div id="topscreen" style="width: 100%;">
                <SmallOrderList orders={props.orders} /> 
                <OrderItems orders={props.orders} order={props.order} orderItems={props.orderItems} />
            </div>
        </div>
    )
};

const SmallOrderList = function(props) {
    let orders = props.orders;

    let list = [];
    for (let i = 0; i < orders.length; i++) {
        list.push(<OrderListOrder order={orders[i]} />);
    }

    return (
        <div class="orderList">
            {list}
        </div>
    )
};

const OrderListOrder = function(props) {
    
    // let theCount = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
    // theCount = CACHE.get("eventsContactCount")[props.event.Id] ? theCount : "None";
    //let theCount = "5";

    let fn = function(e) {
        e.orderId = e.currentTarget.dataset && e.currentTarget.dataset.recordId;
        e.frameworkDetail = e.currentTarget.dataset;
        e.action = e.currentTarget.dataset.action;
    };

    let classString = props.order.Status == 'Draft' ? 'yellow-highlight' : 'green-highlight';
    classString = classString + " orderbox-highlights"
    
    return (
        <div class="orderClick orderItem" data-action="loadorder" onclick={fn} href={"#" + props.order.Id} data-record-id={props.order.Id} >
            <div class={classString}>
                <div class="listOrderId">{props.order.OrderNumber}</div>
                <div class="listOrderDate">{props.order.EffectiveDate}</div>
            </div>
            <div>
                <p class="listOrderText">{props.order.BillToContact ? props.order.BillToContact.Name : "NA"}</p>
            </div>
            <div>
                <p class="listOrderText">{props.order.TotalPrice}</p>
            </div>
        </div>
    )
};


const OrderItems = function(props) {
    let order = props.order;

    let orderItems = props.orderItems;


    //let fn = function(e) {
    //    e.orderId = e.currentTarget.dataset && e.currentTarget.dataset.orderId;
    //    e.frameworkDetail = [e.frameworkDetail, e.orderId];
    //};

    let theList = <OrderItemList order={props.order} orderItems={props.orderItems} />;

    if (order) {
        order = props.order[0];
        let contactName = "NA";//order.BillToContact ? props.order.BillToContact.Name : "NA";
        if (order.BillToContact) {
            contactName = order.BillToContact.Name;
        }
        
        
        return(
            <div>
                <div>
                    <div>
                        <h1>{"Order " + order.OrderNumber}</h1>
                    </div>
                    <div class="yellow-highlight" style="float:right;">
                        {"Created " + order.EffectiveDate + ", by NEED THIS DATA"}
                    </div>
                    <h2>{contactName}</h2>
                    <h4>{order.TotalAmount}</h4>
                    {theList}
                </div>
            </div>
        )
    }
    else {
        console.log("right side not rendered");
        return(
            <div>Right side not rendered</div>
        )
    }
};

const OrderItemList = function(props) {
    let order = props.order;
    let orderItemsProps = props.orderItems || [];

    let orderItemsVnodes = [];
    for (let i = 0; i < orderItemsProps.length; i++) {
        orderItemsVnodes.push(<OrderItem order={order} orderItem={orderItemsProps[i]} />);
        
    }

    return (
        <div style="width:70%; float:left;" id="listOfOrderItems">
            {orderItemsVnodes}
        </div>
    )
};

const OrderItem = function(props) {

    let orderItem = props.orderItem;
    let order = props.order;


    //Id, Product2Id, Product2.Name, UnitPrice, Quantity, TotalPrice
    let tableContact = "NA";
    let tableContactId = "0030a00001V0uTWAAZ";
    let tableExpiry = "NA";
    let tableProduct = "NA";
    let tableProductId = "01t0a000004Ov6bAAC";
    let tableDiscription = "NA";
    let tableNote1 = "NA";
    let tableNote2 = "NA";
    let tableNote3 = "NA";
    let tableUnitPrice = "NA";
    let tableQuantity = "NA";
    let tableSubtotal = "NA";

    if (orderItem.Product2) {
        if (orderItem.Product2.Name) {
            tableProduct = orderItem.Product2.Name;
        }
    }
    if (orderItem.UnitPrice) {
        tableUnitPrice = orderItem.UnitPrice;
    }
    if (orderItem.Quantity) {
        tableQuantity = orderItem.Quantity;
    }
    if (orderItem.TotalPrice) {
        tableSubtotal = orderItem.TotalPrice;
    }
    if (orderItem.Note_1__c) {
        tableNote1 = orderItem.Note_1__c;
    }
    if (orderItem.Note_2__c) {
        tableNote2 = orderItem.Note_2__c;
    }
    if (orderItem.Note_3__c) {
        tableNote3 = orderItem.Note_3__c;
    }
    if (orderItem.FirstName__c) {
        if (orderItem.LastName__c) {
            tableContact = orderItem.FirstName__c + " " + orderItem.LastName__c;
        }
        else {
            tableContact = orderItem.FirstName__c;
        }
    }
    else {
        if (orderItem.LastName__c) {
            tableContact = orderItem.LastName__c;
        }
    }
    if (orderItem.ExpirationDate__c) {
        tableExpiry = orderItem.ExpirationDate__c;
    }


    let fn = function(e) {
        e.orderId = e.currentTarget.dataset && e.currentTarget.dataset.recordId && e.currentTarget.dataset.orderitemId;
        e.frameworkDetail = e.currentTarget.dataset;
        e.action = e.currentTarget.dataset.action;
    };

    //fix the bellow id field so that the id isnt also in the class
    return (
        <div class="orderItemBox">
            <ul class={"autocomplete id-" + orderItem.Id} Id={orderItem.Id} onchange={fn} data-orderitem-id={order[0].Id} data-record-id={orderItem.Id} data-action="save-order-item">
                <div class="order-actions order-item" style="float:left;">
                    <a target="_blank" class="marginMaker2">Remove Order Item</a>
                </div>
                <div class="order-note-buttons order-item" style="float:left;">
                    <button class="noteButton1 styled-active" type="button" onclick={toggleNote1}>
                        Toggle Note 1
                    </button>
                </div>
                <div class="order-note-buttons order-item" style="float:left;">
                    <button class="noteButton2 styled-active" type="button" onclick={toggleNote2}>
                        Toggle Note 2
                    </button>
                </div>
                <div class="order-note-buttons order-item">
                    <button class="noteButton3 styled-active" type="button" onclick={toggleNote3}>
                        Toggle Note 3
                    </button>
                </div>
                
                <div class="notNotes">
                    <div class="order-actions order-item order-item-contact" style="float:left;">
                        <p>Contact</p>
                        <input class="orderOnChange orderItemData contact" type="text" autocomplete="off" id="contact" value={tableContact} required maxlength="100" />
                        <input class="orderOnChange orderItemData contactId" type="hidden" id="contactId" value={tableContactId} />
                    </div>
                    <div class="order-actions order-item order-item-experation" style="float:left;">
                        <p>Experation</p>
                        <input class="orderOnChange orderItemData expiration" style="width: 75px;" type="text" id="experation" value={tableExpiry} maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-product" style="float:left;">
                        <p>Product</p>
                        <input class="orderOnChange orderItemData product" type="text" autocomplete="off" id="product" value={tableProduct} required maxlength="100" />
                        <input class="orderOnChange orderItemData productId" type="hidden" id="productId" value={tableProductId} />
                    </div>
                    <div class="order-actions order-item order-item-description" style="float:left;">
                        <p>Line Descritpion</p>
                        <input class="orderOnChange orderItemData description" type="text" id="discription" value={tableDiscription} maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-price" style="float:left;">
                        <p>Unit Price</p>
                        <input class="orderOnChange orderItemData unitprice" style="width: 75px;" type="text" id="unitprice" value={tableUnitPrice} required maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-quantity" style="float:left;">
                        <p>Quantity</p>
                        <input class="orderOnChange orderItemData quantity" style="width: 75px;" type="number" id="quantity" value={tableQuantity} required maxlength="100" />
                    </div>
                    <div class="order-actions order-item order-item-total">
                        <p>Sub Total</p>
                        <input class="orderOnChange orderItemData subtotal" style="width: 75px;" type="number" id="subtotal" value={tableSubtotal} required maxlength="100" />
                    </div>
                </div>
                
                <div class="order-actions order-item order-item-note1 hidden">
                    <p>Note 1</p>
                    <textarea class="orderOnChange orderItemData note1" id="note1" name="note1" rows="4" cols="100">{tableNote1}</textarea>
                </div>
                <div class="order-actions order-item order-item-note2 hidden">
                    <p>Note 2</p>
                    <textarea class="orderOnChange orderItemData note2" id="note2" name="note2" rows="4" cols="100">{tableNote2}</textarea>
                </div>
                <div class="order-actions order-item order-item-note3 hidden">
                    <p>Note 3</p>
                    <textarea class="orderOnChange orderItemData note3" id="note3" name="note3" rows="4" cols="100">{tableNote3}</textarea>
                </div>
            </ul>
        </div>
    )
};

function makeNotesHidden() {
    document.getElementsByClassName("noteButton1")[0].classList.remove("styled-inactive");
    document.getElementsByClassName("noteButton2")[0].classList.remove("styled-inactive");
    document.getElementsByClassName("noteButton3")[0].classList.remove("styled-inactive");

    document.getElementsByClassName("noteButton1")[0].classList.add("styled-active");
    document.getElementsByClassName("noteButton2")[0].classList.add("styled-active");
    document.getElementsByClassName("noteButton3")[0].classList.add("styled-active");

    document.getElementsByClassName("order-item-note1")[0].classList.add("hidden");
    document.getElementsByClassName("order-item-note2")[0].classList.add("hidden");
    document.getElementsByClassName("order-item-note3")[0].classList.add("hidden");
}

function toggleNote1() {
    if (document.getElementsByClassName("order-item-note1")[0].classList.contains("hidden")) {
        //let row = document.getElementById(orderItemId);
        document.getElementsByClassName("notNotes")[0].classList.add("hidden");
        //we are toggling it otherwise add a seperate css class for a button thats currently selected
        //document.getElementsByClassName("noteButton1")[0].classList.remove("styled-active");
        //document.getElementsByClassName("noteButton1")[0].classList.add("styled-inactive");
        makeNotesHidden();
        document.getElementsByClassName("noteButton1")[0].classList.remove("styled-active");
        document.getElementsByClassName("noteButton1")[0].classList.add("styled-inactive");
        document.getElementsByClassName("order-item-note1")[0].classList.remove("hidden");
    }
    else {
        document.getElementsByClassName("notNotes")[0].classList.remove("hidden");
        makeNotesHidden();
    }
}
function toggleNote2() {
    if (document.getElementsByClassName("order-item-note2")[0].classList.contains("hidden")) {
        document.getElementsByClassName("notNotes")[0].classList.add("hidden");
        
        makeNotesHidden();
        document.getElementsByClassName("noteButton2")[0].classList.remove("styled-active");
        document.getElementsByClassName("noteButton2")[0].classList.add("styled-inactive");
        document.getElementsByClassName("order-item-note2")[0].classList.remove("hidden");
    }
    else {
        document.getElementsByClassName("notNotes")[0].classList.remove("hidden");
        makeNotesHidden();
    }
}
function toggleNote3() {
    if (document.getElementsByClassName("order-item-note3")[0].classList.contains("hidden")) {
        document.getElementsByClassName("notNotes")[0].classList.add("hidden");
        
        makeNotesHidden();
        document.getElementsByClassName("noteButton3")[0].classList.remove("styled-active");
        document.getElementsByClassName("noteButton3")[0].classList.add("styled-inactive");
        document.getElementsByClassName("order-item-note3")[0].classList.remove("hidden");
    }
    else {
        document.getElementsByClassName("notNotes")[0].classList.remove("hidden");
        makeNotesHidden();
    }
}




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







const LargeOrderList = function(props) {
    let orders = props.orders;

    let list = [];
    for (let i = 0; i < orders.length; i++) {
        list.push(<OrderListOrder order={orders[i]} />);
    }

    return(
        <div id="bottomscreen" style="clear:both">
            <div class="orderList">
                {list}
            </div>
        </div>
    )
};
