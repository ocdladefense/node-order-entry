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
  var fn = function fn(e) {
    e.orderId = e.currentTarget.dataset && e.currentTarget.dataset.recordId;
    e.frameworkDetail = e.currentTarget.dataset;
    e.action = e.currentTarget.dataset.action;
    console.log(e.orderId);
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
  var theList = vNode(OrderItemList, {
    order: props.order,
    orderItems: props.orderItems
  });

  if (order) {
    order = props.order[0];
    var contactName = "NA";

    if (order.BillToContact) {
      contactName = order.BillToContact.Name;
    }

    var fn = function fn(e) {
      var currentTargetDataset = e.currentTarget.dataset || {};
      var targetDataset = e.target.dataset || {};
      e.frameworkDetail = objectCombiner(currentTargetDataset, targetDataset);

      if (e.type == "click") {
        e.frameworkDetail.action = "add-order-item";
      }
    };

    return vNode("div", null, vNode("div", null, vNode("div", null, vNode("h1", {
      style: "float:left;"
    }, "Order " + order.OrderNumber + ":")), vNode("div", {
      "class": "yellow-highlight",
      style: "float:right;"
    }, "Created " + order.EffectiveDate + ", by NEED THIS DATA"), vNode("h1", null, " " + contactName), vNode("h4", null, order.TotalAmount), vNode("div", null, vNode("button", {
      "class": "add-order-button",
      type: "button",
      onclick: fn,
      "data-action": "add-order-item",
      "data-record-id": order.Id
    }, "Add Order Item")), theList));
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
  var order = props.order;
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
    e.frameworkDetail = objectCombiner(currentTargetDataset, targetDataset);

    if (e.type == "change") {
      e.frameworkDetail.action = "save-order-item";
    } else if (e.type == "click") {
      e.frameworkDetail.action = "toggle-notes";
    }
  };

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
    "class": "note-button-1 styled-active",
    type: "button",
    "data-which-notes": 1,
    "data-action": "toggle-notes"
  }, "Toggle Note 1")), vNode("div", {
    "class": "order-note-buttons order-item",
    style: "float:left;"
  }, vNode("button", {
    "class": "note-button-2 styled-active",
    type: "button",
    "data-which-notes": 2,
    "data-action": "toggle-notes"
  }, "Toggle Note 2")), vNode("div", {
    "class": "order-note-buttons order-item"
  }, vNode("button", {
    "class": "note-button-3 styled-active",
    type: "button",
    "data-which-notes": 3,
    "data-action": "toggle-notes"
  }, "Toggle Note 3")), vNode("div", {
    "class": "not-notes hidden displayed"
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
    "class": "order-actions order-item order-item-note-1 hidden"
  }, vNode("p", null, "Note 1"), vNode("textarea", {
    "class": "orderOnChange orderItemData note1",
    id: "note1",
    name: "note1",
    rows: "4",
    cols: "100"
  }, tableNote1)), vNode("div", {
    "class": "order-actions order-item order-item-note-2 hidden"
  }, vNode("p", null, "Note 2"), vNode("textarea", {
    "class": "orderOnChange orderItemData note2",
    id: "note2",
    name: "note2",
    rows: "4",
    cols: "100"
  }, tableNote2)), vNode("div", {
    "class": "order-actions order-item order-item-note-3 hidden"
  }, vNode("p", null, "Note 3"), vNode("textarea", {
    "class": "orderOnChange orderItemData note3",
    id: "note3",
    name: "note3",
    rows: "4",
    cols: "100"
  }, tableNote3))));
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