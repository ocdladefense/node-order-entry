/** @jsx vNode */

/**

This is our list of components to be used in the app.

**/
export { HomeFullNode, OrderItems, OrderItem, SmallOrderList, LargeOrderList };
import { vNode, objectCombiner } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { switchOrder } from './events.js';

var HomeFullNode = function HomeFullNode(props) {
  return vNode("div", null, vNode(OrderDetailsSection, {
    orders: props.orders,
    order: props.order,
    orderItems: props.orderItems
  }), vNode("div", {
    id: "bottomListOrders"
  }, vNode(LargeOrderList, {
    orders: props.orders
  })));
};

var OrderDetailsSection = function OrderDetailsSection(props) {
  return vNode("div", null, vNode("div", {
    id: "topscreen",
    style: "width: 100%;"
  }, vNode(SmallOrderList, {
    orders: props.orders
  }), vNode(OrderItems, {
    orders: props.orders,
    order: props.order,
    orderItems: props.orderItems
  })));
};

var SmallOrderList = function SmallOrderList(props) {
  var orders = props.orders;
  var list = [];

  for (var i = 0; i < orders.length; i++) {
    list.push(vNode(OrderListOrder, {
      order: orders[i]
    }));
  }

  return vNode("div", {
    "class": "orderList"
  }, list);
};

var OrderListOrder = function OrderListOrder(props) {
  // let theCount = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
  // theCount = CACHE.get("eventsContactCount")[props.event.Id] ? theCount : "None";
  //let theCount = "5";
  var fn = function fn(e) {
    e.orderId = e.currentTarget.dataset && e.currentTarget.dataset.recordId;
    e.frameworkDetail = e.currentTarget.dataset;
    e.action = e.currentTarget.dataset.action;
  };

  var classString = props.order.Status == 'Draft' ? 'yellow-highlight' : 'green-highlight';
  classString = classString + " orderbox-highlights";
  return vNode("div", {
    "class": "orderClick orderItem",
    "data-action": "loadorder",
    onclick: fn,
    href: "#" + props.order.Id,
    "data-record-id": props.order.Id
  }, vNode("div", {
    "class": classString
  }, vNode("div", {
    "class": "listOrderId"
  }, props.order.OrderNumber), vNode("div", {
    "class": "listOrderDate"
  }, props.order.EffectiveDate)), vNode("div", null, vNode("p", {
    "class": "listOrderText"
  }, props.order.BillToContact ? props.order.BillToContact.Name : "NA")), vNode("div", null, vNode("p", {
    "class": "listOrderText"
  }, props.order.TotalPrice)));
};

var OrderItems = function OrderItems(props) {
  var order = props.order;
  var orderItems = props.orderItems; //let fn = function(e) {
  //    e.orderId = e.currentTarget.dataset && e.currentTarget.dataset.orderId;
  //    e.frameworkDetail = [e.frameworkDetail, e.orderId];
  //};

  var theList = vNode(OrderItemList, {
    order: props.order,
    orderItems: props.orderItems
  });

  if (order) {
    order = props.order[0];
    var contactName = "NA"; //order.BillToContact ? props.order.BillToContact.Name : "NA";

    if (order.BillToContact) {
      contactName = order.BillToContact.Name;
    }

    return vNode("div", null, vNode("div", null, vNode("div", null, vNode("h1", {
      style: "float:left;"
    }, "Order " + order.OrderNumber + ":")), vNode("div", {
      "class": "yellow-highlight",
      style: "float:right;"
    }, "Created " + order.EffectiveDate + ", by NEED THIS DATA"), vNode("h1", null, " " + contactName), vNode("h4", null, order.TotalAmount), theList));
  } else {
    console.log("right side not rendered");
    return vNode("div", null, "Right side not rendered");
  }
};

var OrderItemList = function OrderItemList(props) {
  var order = props.order;
  var orderItemsProps = props.orderItems || [];
  var orderItemsVnodes = [];

  for (var i = 0; i < orderItemsProps.length; i++) {
    orderItemsVnodes.push(vNode(OrderItem, {
      order: order,
      orderItem: orderItemsProps[i]
    }));
  }

  return vNode("div", {
    style: "width:70%; float:left;",
    id: "listOfOrderItems"
  }, orderItemsVnodes);
};

var OrderItem = function OrderItem(props) {
  var orderItem = props.orderItem;
  var order = props.order; //Id, Product2Id, Product2.Name, UnitPrice, Quantity, TotalPrice

  var tableContact = "NA";
  var tableContactId = "0030a00001V0uTWAAZ";
  var tableExpiry = "NA";
  var tableProduct = "NA";
  var tableProductId = "01t0a000004Ov6bAAC";
  var tableDiscription = "NA";
  var tableNote1 = "NA";
  var tableNote2 = "NA";
  var tableNote3 = "NA";
  var tableUnitPrice = "NA";
  var tableQuantity = "NA";
  var tableSubtotal = "NA";

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
    } else {
      tableContact = orderItem.FirstName__c;
    }
  } else {
    if (orderItem.LastName__c) {
      tableContact = orderItem.LastName__c;
    }
  }

  if (orderItem.ExpirationDate__c) {
    tableExpiry = orderItem.ExpirationDate__c;
  }

  var fn = function fn(e) {
    var currentTargetDataset = e.currentTarget.dataset || {};
    var targetDataset = e.target.dataset || {};
    e.frameworkDetail = objectCombiner(currentTargetDataset, targetDataset); //console.log(e.type);

    if (e.type == "change") {
      e.frameworkDetail.action = "save-order-item"; //e.currentTarget.dataset.action;
    } else if (e.type == "click") {
      //console.log("triggered");
      e.frameworkDetail.action = "toggle-notes";
    }
  }; //fix the bellow id field so that the id isnt also in the class


  return vNode("div", {
    "class": "orderItemBox"
  }, vNode("div", {
    "class": "autocomplete id-" + orderItem.Id,
    id: "id-" + orderItem.Id,
    onchange: fn,
    onclick: fn,
    "data-orderitem-id": order[0].Id,
    "data-record-id": orderItem.Id,
    "data-action": "save-order-item"
  }, vNode("div", {
    "class": "order-actions order-item",
    style: "float:left;"
  }, vNode("a", {
    target: "_blank",
    "class": "marginMaker2"
  }, "Remove Order Item")), vNode("div", {
    "class": "order-note-buttons order-item",
    style: "float:left;"
  }, vNode("button", {
    "class": "noteButton1 styled-active",
    type: "button",
    "data-which-notes": 1
  }, "Toggle Note 1")), vNode("div", {
    "class": "order-note-buttons order-item",
    style: "float:left;"
  }, vNode("button", {
    "class": "noteButton2 styled-active",
    type: "button",
    "data-which-notes": 2
  }, "Toggle Note 2")), vNode("div", {
    "class": "order-note-buttons order-item"
  }, vNode("button", {
    "class": "noteButton3 styled-active",
    type: "button",
    "data-which-notes": 3
  }, "Toggle Note 3")), vNode("div", {
    "class": "notNotes"
  }, vNode("div", {
    "class": "order-actions order-item order-item-contact",
    style: "float:left;"
  }, vNode("p", null, "Contact"), vNode("input", {
    "class": "orderOnChange orderItemData contact",
    type: "text",
    autocomplete: "off",
    id: "contact",
    value: tableContact,
    required: true,
    maxlength: "100"
  }), vNode("input", {
    "class": "orderOnChange orderItemData contactId",
    type: "hidden",
    id: "contactId",
    value: tableContactId
  })), vNode("div", {
    "class": "order-actions order-item order-item-experation",
    style: "float:left;"
  }, vNode("p", null, "Experation"), vNode("input", {
    "class": "orderOnChange orderItemData expiration",
    style: "width: 75px;",
    type: "text",
    id: "experation",
    value: tableExpiry,
    maxlength: "100"
  })), vNode("div", {
    "class": "order-actions order-item order-item-product",
    style: "float:left;"
  }, vNode("p", null, "Product"), vNode("input", {
    "class": "orderOnChange orderItemData product",
    type: "text",
    autocomplete: "off",
    id: "product",
    value: tableProduct,
    required: true,
    maxlength: "100"
  }), vNode("input", {
    "class": "orderOnChange orderItemData productId",
    type: "hidden",
    id: "productId",
    value: tableProductId
  })), vNode("div", {
    "class": "order-actions order-item order-item-description",
    style: "float:left;"
  }, vNode("p", null, "Line Descritpion"), vNode("input", {
    "class": "orderOnChange orderItemData description",
    type: "text",
    id: "discription",
    value: tableDiscription,
    maxlength: "100"
  })), vNode("div", {
    "class": "order-actions order-item order-item-price",
    style: "float:left;"
  }, vNode("p", null, "Unit Price"), vNode("input", {
    "class": "orderOnChange orderItemData unitprice",
    style: "width: 75px;",
    type: "text",
    id: "unitprice",
    value: tableUnitPrice,
    required: true,
    maxlength: "100"
  })), vNode("div", {
    "class": "order-actions order-item order-item-quantity",
    style: "float:left;"
  }, vNode("p", null, "Quantity"), vNode("input", {
    "class": "orderOnChange orderItemData quantity",
    style: "width: 75px;",
    type: "number",
    id: "quantity",
    value: tableQuantity,
    required: true,
    maxlength: "100"
  })), vNode("div", {
    "class": "order-actions order-item order-item-total"
  }, vNode("p", null, "Sub Total"), vNode("input", {
    "class": "orderOnChange orderItemData subtotal",
    style: "width: 75px;",
    type: "number",
    id: "subtotal",
    value: tableSubtotal,
    required: true,
    maxlength: "100"
  }))), vNode("div", {
    "class": "order-actions order-item order-item-note1 hidden"
  }, vNode("p", null, "Note 1"), vNode("textarea", {
    "class": "orderOnChange orderItemData note1",
    id: "note1",
    name: "note1",
    rows: "4",
    cols: "100"
  }, tableNote1)), vNode("div", {
    "class": "order-actions order-item order-item-note2 hidden"
  }, vNode("p", null, "Note 2"), vNode("textarea", {
    "class": "orderOnChange orderItemData note2",
    id: "note2",
    name: "note2",
    rows: "4",
    cols: "100"
  }, tableNote2)), vNode("div", {
    "class": "order-actions order-item order-item-note3 hidden"
  }, vNode("p", null, "Note 3"), vNode("textarea", {
    "class": "orderOnChange orderItemData note3",
    id: "note3",
    name: "note3",
    rows: "4",
    cols: "100"
  }, tableNote3))));
};

var EventSearch = function EventSearch(props) {
  var searchBar = props.searchBar;
  var datesChecked = props.datesChecked;
  var contactsChecked = props.contactsChecked;
  return vNode("div", {
    "class": "flex-parent object-list",
    id: "searchArea"
  }, vNode("h1", null, "My Object"), vNode("h3", null, "Recent records"), vNode("h3", null, "Record search"), vNode("div", {
    "class": "form-item"
  }, vNode("input", {
    type: "text",
    id: "record-search",
    placeholder: "Enter search terms...",
    value: searchBar
  })), vNode("div", {
    "class": "form-item"
  }, vNode("input", {
    type: "button",
    id: "submit-search",
    "data-action": "search",
    value: "search"
  })), vNode("div", {
    "class": "form-item"
  }, vNode("label", null, "Dates from Oldest to Newest"), vNode("input", {
    type: "checkbox",
    id: "date-checkbox",
    checked: datesChecked ? true : null
  })), vNode("div", {
    "class": "form-item"
  }, vNode("label", null, "Number of Attendees from Highest to Lowest"), vNode("input", {
    type: "checkbox",
    id: "contacts-checkbox",
    checked: contactsChecked ? true : null
  })));
};

var EventList = function EventList(props) {
  var events = props.events;
  var list = [];

  for (var i = 0; i < events.length; i++) {
    list.push(vNode(EventListItem, {
      event: events[i]
    }));
  }

  return vNode("div", {
    "class": "flex-parent record-list",
    id: "record-list-3"
  }, list);
};

var EventListItem = function EventListItem(props) {
  // let theCount = parseInt(CACHE.get("eventsContactCount")[props.event.Id] && CACHE.get("eventsContactCount")[props.event.Id].expr0).toString();
  // theCount = CACHE.get("eventsContactCount")[props.event.Id] ? theCount : "None";
  var theCount = "5";
  return vNode("div", {
    "class": "record-list-item"
  }, vNode("h3", null, vNode("a", {
    "class": "record-button record-button-2",
    href: "#" + props.event.Id,
    "data-action": "details",
    "data-event-id": props.event.Id
  }, props.event.Name)), vNode("p", null, props.event.Banner_Location_Text__c), vNode("p", null, props.event.Start_Date__c), vNode("p", null, "Attendees: ", theCount));
};

var EventFull = function EventFull(props) {
  return vNode("div", null, vNode(EventDetails, {
    event: props.event
  }));
};

var EventDetails = function EventDetails(props) {
  var event = props.event;
  return vNode("div", null, vNode("h1", {
    "class": "margin-maker-2"
  }, event.Name), vNode("h3", {
    "class": "margin-maker"
  }, event.Start_Date__c), vNode("a", {
    href: "https://ocdla.force.com/OcdlaEvent?id=" + event.Id,
    target: "_blank",
    "class": "margin-maker"
  }, "Link to the event page in more detail."));
};

var ContactList = function ContactList(props) {
  var contacts = props.contacts;
  var attendees = [];

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].Contact__r != null) {
      attendees.push(vNode(Attendee, {
        contact: contacts[i]
      }));
    }
  }

  return vNode("div", {
    "class": "flex-parent contact-list",
    id: "contactList3"
  }, vNode("br", null), vNode("h3", null, "List of Attendees"), vNode("p", null, "An X by the name indicates membership."), vNode("ul", {
    "class": "table-row should-be-invisible table-headers"
  }, vNode("li", {
    "class": "table-cell"
  }, "Name"), vNode("li", {
    "class": "table-cell"
  }, "Order Date"), vNode("li", {
    "class": "table-cell"
  }, "Ticket Type"), vNode("li", {
    "class": "table-cell"
  }, "Location")), attendees);
};

var Attendee = function Attendee(props) {
  var _contact$Contact__r$M;

  var contact = props.contact;
  return vNode("ul", {
    "class": "table-row"
  }, vNode("li", {
    "class": "table-cell attendee-name"
  }, contact.Contact__r.Name + createMemberX(contact.Contact__r.Ocdla_Current_Member_Flag__c)), vNode("li", {
    "class": "table-cell attendee-order-date"
  }, contact.Order.EffectiveDate), vNode("li", {
    "class": "table-cell attendee-ticket-name"
  }, contact.Product2.Name), vNode("li", {
    "class": "table-cell attendee-city"
  }, ((_contact$Contact__r$M = contact.Contact__r.MailingCity) !== null && _contact$Contact__r$M !== void 0 ? _contact$Contact__r$M : ' ') + stateFormatter(contact.Contact__r.MailingState)));
};

var LargeOrderList = function LargeOrderList(props) {
  var orders = props.orders;
  var list = [];

  for (var i = 0; i < orders.length; i++) {
    list.push(vNode(OrderListOrder, {
      order: orders[i]
    }));
  }

  return vNode("div", {
    id: "bottomscreen",
    style: "clear:both"
  }, vNode("div", {
    "class": "orderList"
  }, list));
};