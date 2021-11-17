/** @jsx vNode */
export { switchToList, switchOrder, doSearch, saveOrderItem };
import { vNode, updateElement } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { OrderItems, HomeFullNode } from './components.js';
import { getOrders, getOrder, getSingleOrder } from './data.js';

function switchOrder(props) {
  //render just the right side, not everything
  var orderItems = getOrder(props.recordId);
  var singleOrder = getSingleOrder(props.recordId);
  var theList = getOrders();
  return Promise.all([orderItems, theList, singleOrder]).then(function (data) {
    console.log("promise finished");
    return vNode(HomeFullNode, {
      orders: data[1],
      order: data[2],
      orderItems: data[0]
    }); //return <OrderItems orders={data[1]} order={data[2]} orderItems={data[0]} />;
  });
}

function saveOrderItem(props) {
  console.log(props); //console.log("document.getElementById(props.recordId)");
  //extract, autofill, validateBeforeSave, save
  //{"orderId":order.Id, "orderItem":orderItem.Id}

  var obj = extractOrderItemData(props.recordId);
  obj = autofill(obj);

  if (validateBeforeSave(obj)) {
    save(obj).then(updateElement)["catch"](function (e) {
      window.alert(e);
    });
  } //orderitemId:


  var orderItems = getOrder(props.orderitemId);
  var singleOrder = getSingleOrder(props.orderitemId);
  var theList = getOrders();
  return Promise.all([orderItems, theList, singleOrder]).then(function (data) {
    console.log("promise finished");
    return vNode(HomeFullNode, {
      orders: data[1],
      order: data[2],
      orderItems: data[0]
    }); //return <OrderItems orders={data[1]} order={data[2]} orderItems={data[0]} />;
  });
} //Id, Product2Id, Note_1__c, Note_2__c, Note_3__c, FirstName__c, LastName__c, ExpirationDate__c, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItem WHERE OrderId = '$Id'"


function extractOrderItemData(recordId) {
  var row = document.getElementById(recordId);
  var contact = row.getElementsByClassName("contact")[0];
  var contactId = "0030a00001V0uTWAAZ"; //Elijah R.L. Brown

  var productId = "01t0a000004Ov6bAAC"; //CLE Archive: 2015 House Bill 2320 (Package)

  var expiration = row.getElementsByClassName("expiration")[0];
  var product = row.getElementsByClassName("product")[0];
  var description = row.getElementsByClassName("description")[0];
  var note1 = row.getElementsByClassName("note1")[0];
  var note2 = row.getElementsByClassName("note2")[0];
  var note3 = row.getElementsByClassName("note3")[0];
  var unitprice = row.getElementsByClassName("unitprice")[0];
  var quantity = row.getElementsByClassName("quantity")[0];
  var subtotal = row.getElementsByClassName("subtotal")[0];
  var expirationValue = expiration.value;
  var productValue = product.value;
  var descriptionValue = description.value;
  var note1Value = note1.value;
  var note2Value = note2.value;
  var note3Value = note3.value;
  var unitpriceValue = unitprice.value;
  var quantityValue = quantity.value;
  var subtotalValue = subtotal.value;
  return {
    "Id": recordId,
    "Product2Id": productId,
    "Contact__c": contactId,
    "Description": descriptionValue,
    "Note_1__c": note1Value,
    "Note_2__c": note2Value,
    "Note_3__c": note3Value,
    "ExpirationDate__c": expirationValue,
    "Product2Name": productValue,
    "UnitPrice": unitpriceValue,
    "Quantity": quantityValue,
    "TotalPrice": subtotalValue
  };
}

function autofill(obj) {
  if (obj["UnitPrice"] && obj["Quantity"]) {
    obj["TotalPrice"] = obj["UnitPrice"] * obj["Quantity"];
  }

  return obj;
}

function validateBeforeSave(obj) {
  //validate function will look at data and return true or false to see if save data, if important parts are null
  return true;
}

function save(obj) {
  //fetch take data, put into json, returns promise?
  var demoErrors = false;

  if (demoErrors) {
    return Promise.reject("salesforce has encountered an error"); //throw new Error("salesforce has encountered an error");
  } else {
    console.log("saved");
    return Promise.resolve({
      Id: "foobar"
    });
  }
} ///getstufflike price based off of product id, giving quantity totalrpice 
//function called update total price, called here and in events where we look for updated text


function switchToDetails(id) {
  var event = getEventDetails(id); // let contacts = getRegistrants(id);

  return Promise.all([event]).then(function (data) {
    document.getElementById("switchButton").classList.value = "switchButton"; //return <EventFull event={data[0]} />;// contacts={data[1]} />;
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
  } //let virtualNodes = <div><EventListFull events={results} searchBar={stringEntered} datesChecked={orderDatesAcs} contactsChecked={orderAttendeesDesc} /></div>;


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