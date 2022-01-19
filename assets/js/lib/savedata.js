/** @jsx vNode */
export { saveOrderItem, setUpAutoComplete, addNewOrderItem, deleteOrderItem, addNewOrderItemButtonPressed };
import { vNode, updateElement, changeMainContainer } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';
import { getOrders, getOrderById, getOrderItems, createNewOrderEntry, deleteOrderEntry } from './data.js';
import { OrderItems, HomeFullNode, SmallOrderList, OrderItem, LargeOrderList } from './components.js';

function saveOrderItem(props) {
  var savedOrderItem;
  var obj = extractOrderItemData(props.recordId);
  obj = autofill(obj);

  if (validateBeforeSave(obj)) {
    savedOrderItem = save(obj, props)["catch"](function (e) {
      console.log("error message " + e);
    }); //take the id, return from server, if neccessary update the effected row (could use regular dom methods)
  }

  savedOrderItem.then(function (orderItem) {
    return null; //dom operations, return promise of vnodes, ect
  });
  /*
  changeMainContainer("bottomListOrders");
  let theList = getOrders();
  let singleOrder = getOrderById(props.orderitemId);
  let orderItems = getOrderItems(props.orderitemId);
  fillOrderItemData(obj);*/

  return null;
  return Promise.all([theList, singleOrder, orderItems]).then(function (data) {
    return vNode(LargeOrderList, {
      orders: data[0]
    });
  });
} //obj stores all the values in the fields of the order item, props is giong to contain recordId and orderId (and data-action?)


function save(obj, props) {
  //fetch takes data, put into json, returns promise?
  var demoErrors = false;
  var demoResponse = {
    Id: jsIdGenerator()
  };

  if (demoErrors) {
    return Promise.reject("salesforce has encountered an error"); //throw new Error("salesforce has encountered an error");
  } //we have the info to know which row produced the event, 


  return fetch('/orderentry/createneworder/' + props.orderitemId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('Success:', data);
    return data;
  }); //deleteOrderItem(props);
}

function extractOrderItemData(recordId) {
  //TODO: right now it only gets the first one?
  var contact = document.querySelector("#id-" + recordId + " .contact");
  var product = document.querySelector("#id-" + recordId + " .product");
  var contactId = document.querySelector("#id-" + recordId + " .contactId");
  var productId = document.querySelector("#id-" + recordId + " .productId");
  var expiration = document.querySelector("#id-" + recordId + " .expiration");
  var description = document.querySelector("#id-" + recordId + " .description");
  var note1 = document.querySelector("#id-" + recordId + " .note1");
  var note2 = document.querySelector("#id-" + recordId + " .note2");
  var note3 = document.querySelector("#id-" + recordId + " .note3");
  var unitprice = document.querySelector("#id-" + recordId + " .unitprice");
  var quantity = document.querySelector("#id-" + recordId + " .quantity");
  var subtotal = document.querySelector("#id-" + recordId + " .subtotal");
  var contactValue = contact.value;
  var productValue = product.value;
  var contactIdValue = contactId.value;
  var productIdValue = productId.value;
  var expirationValue = expiration.value;
  var descriptionValue = description.value;
  var note1Value = note1.value;
  var note2Value = note2.value;
  var note3Value = note3.value;
  var unitpriceValue = unitprice.value;
  var quantityValue = quantity.value;
  var subtotalValue = subtotal.value;

  if (contactIdValue == "unasigned") {
    for (var i = 0; i < contactNames.length; i++) {
      if (contactNames[i].Name == contactValue) {
        contactIdValue = contactNames[i].Id;
      }
    }
  }

  return {
    "Id": recordId,
    "ContactName": contactValue,
    "Product2Name": productValue,
    "ContactId": contactIdValue,
    "Product2Id": productIdValue,
    "Description": descriptionValue,
    "Note_1__c": note1Value,
    "Note_2__c": note2Value,
    "Note_3__c": note3Value,
    "ExpirationDate__c": expirationValue,
    "UnitPrice": unitpriceValue,
    "Quantity": quantityValue,
    "TotalPrice": subtotalValue
  };
}

function fillOrderItemData(obj) {
  document.querySelector("#id-" + obj["Id"] + " .contact").value = obj["ContactName"];
  document.querySelector("#id-" + obj["Id"] + " .expiration").value = obj["ExpirationDate__c"];
  document.querySelector("#id-" + obj["Id"] + " .product").value = obj["Product2Name"];
  document.querySelector("#id-" + obj["Id"] + " .description").value = obj["Description"];
  document.querySelector("#id-" + obj["Id"] + " .note1").value = obj["Note_1__c"];
  document.querySelector("#id-" + obj["Id"] + " .note2").value = obj["Note_2__c"];
  document.querySelector("#id-" + obj["Id"] + " .note3").value = obj["Note_3__c"];
  document.querySelector("#id-" + obj["Id"] + " .unitprice").value = obj["UnitPrice"];
  document.querySelector("#id-" + obj["Id"] + " .quantity").value = obj["Quantity"];
  document.querySelector("#id-" + obj["Id"] + " .subtotal").value = obj["TotalPrice"];
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

function addNewOrderItemButtonPressed(props) {
  //vNode stuff to render blank order item
  changeMainContainer("main");
  var obj = {};

  if (props.recordId) {
    obj = extractOrderItemData(props.recordId);
  } //createNewOrderEntry(props.orderitemId).then();
  //orderUpdate($id = "8018D0000006dm6QAA")


  var theList = getOrders();
  var singleOrder = getOrderById(props.orderitemId);
  var orderItems = getOrderItems(props.orderitemId); //let listData = Promise.all([newOrderEntryProps]).then(function() {
  //    console.log(newOrderEntryProps);
  //    theList = getOrders();
  //    singleOrder = getOrderById(props.recordId);
  //    orderItems = getOrderItems(props.recordId);
  //});

  var vNodes = Promise.all([orderItems, theList, singleOrder]).then(function (data) {
    var newOrderItem = {
      ExpirationDate__c: "2022-01-04",
      FirstName__c: "Tester",
      Id: jsIdGenerator(),
      LastName__c: null,
      Note_1__c: null,
      Note_2__c: null,
      Note_3__c: null,
      Product2: {
        attributes: {},
        Name: '2014 Defending the Modern DUII - Material Hard Copy & CD/Audio CD'
      },
      Product2Id: "01t0a000004Ov6JAAS",
      Quantity: 1,
      TotalPrice: 0,
      UnitPrice: 0,
      attributes: {
        type: 'OrderItem',
        url: '/services/data/v49.0/sobjects/OrderItem/8028D000000MBZfQAO'
      }
    };
    data[0].splice(index, 0, newOrderItem); //data[0].push(newOrderItem);

    return vNode(HomeFullNode, {
      orders: data[1],
      order: data[2],
      orderItems: data[0]
    });
  });
  console.log("end of proceess");
  return vNodes;
}

function addNewOrderItem(obj, props) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  //changeMainContainer("main");
  //obj = extractOrderItemData(props.recordId);
  //console.log("orderItem Id: " + props.orderitemId);
  fetch('/orderentry/createneworder/' + props.orderitemId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('Success:', data);
  })["catch"](function (error) {
    console.error('Error4:', error);
  });
  /*
  //createNewOrderEntry(props.orderitemId).then();
  //orderUpdate($id = "8018D0000006dm6QAA")
  let theList = getOrders();
  let singleOrder = getOrderById(props.orderitemId);
  let orderItems = getOrderItems(props.orderitemId);
    //let listData = Promise.all([newOrderEntryProps]).then(function() {
  //    console.log(newOrderEntryProps);
  //    theList = getOrders();
  //    singleOrder = getOrderById(props.recordId);
  //    orderItems = getOrderItems(props.recordId);
  //});
    let vNodes = Promise.all([orderItems, theList, singleOrder]).then(function(data) {
        let newOrderItem = { 
          ExpirationDate__c: "2022-01-04",
          FirstName__c: "Tester",
          Id: jsIdGenerator(),
          LastName__c: null,
          Note_1__c: null,
          Note_2__c: null,
          Note_3__c: null,
          Product2: {attributes: {}, Name: '2014 Defending the Modern DUII - Material Hard Copy & CD/Audio CD'},
          Product2Id: "01t0a000004Ov6JAAS",
          Quantity: 1,
          TotalPrice: 0,
          UnitPrice: 0,
          attributes: {type: 'OrderItem', url: '/services/data/v49.0/sobjects/OrderItem/8028D000000MBZfQAO'}
      };
      
        data[0].splice(index, 0, newOrderItem);
      //data[0].push(newOrderItem);
        return <HomeFullNode orders={data[1]} order={data[2]} orderItems={data[0]} />;
  });
  console.log("end of proceess");
  return vNodes;*/
}

function deleteOrderItem(props) {
  console.log("DELETED commented out");
  deleteOrderEntry(props.recordId);
  document.querySelector("#id-" + props.recordId).classList.add("hidden");
  ; //removes id- if it has it

  if (props.recordId.charAt(0) == 'i' && props.recordId.charAt(1) == 'd' && props.recordId.charAt(2) == '-') {
    props.recordId = props.recordId.substring(3);
  } //problem with new items still having the js id


  var theList = getOrders();
  var singleOrder = getOrderById(props.orderitemId);
  var orderItems = getOrderItems(props.orderitemId);
  var vNodes = Promise.all([orderItems, theList, singleOrder]).then(function (data) {
    var newOrderItems = [];

    for (var i = 0; i < data[0].length; i++) {
      if (data[0][i].Id != props.recordId) {
        newOrderItems.push(data[0][i]);
      }
    }

    return vNode(HomeFullNode, {
      orders: data[1],
      order: data[2],
      orderItems: newOrderItems
    });
  });
  return vNodes;
}

function jsIdGenerator() {
  //obviously this will need to be randomized and checked against other ids
  return "id-00JSID3334343";
}

var contactNames = [{
  Id: "0030a00001V0uTWAAZ",
  Name: "Elijah R.L. Brown"
}, {
  Id: "0030a00001gICbsAAG",
  Name: "Mary Brownville"
}, {
  Id: "0030a00001edgHuAAI",
  Name: "Edward Piper"
}, {
  Id: "0030a00001V0uqmAAB",
  Name: "Zoe E. Bayham"
}];
var productNames = [{
  Id: "01t0a000004Ov6bAAC",
  Name: "CLE Archive: 2015 House Bill 2320 (Package)"
}, {
  Id: "01t0a000004Ov6eAAC",
  Name: "CLE Archive: 2014 Defending the Modern DUII"
}, {
  Id: "01t0a000004Ov6fAAC",
  Name: "Search and Seizure Seminar–Nonmember Lawyer"
}, {
  Id: "01t0a000004Ov6qAAC",
  Name: "Ardent Advocate 2016–Nonmember Lawyer"
}]; //window.setUpAutoComplete = setUpAutoComplete;

function setUpAutoComplete() {
  console.log("auto");
  var arrayOfElements = document.getElementsByClassName("autocomplete");

  for (var i = 0; i < arrayOfElements.length; i++) {
    var mainElementId = arrayOfElements.item(i).id;
    var mainElementContact = document.querySelector("#" + mainElementId + " .order-item-contact .contact");
    var mainElementProduct = document.querySelector("#" + mainElementId + " .order-item-product .product");

    if (mainElementContact) {
      var contactId = document.querySelector("#" + mainElementId + " .contactId");
      autocomplete(mainElementContact, contactNames, contactId);
    }

    if (mainElementProduct) {
      var productId = document.querySelector("#" + mainElementId + " .productId");
      autocomplete(mainElementProduct, productNames, productId);
    }
  }

  return false;
}

function autocomplete(inp, arr) {
  var inpId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/

  inp.addEventListener("input", function (e) {
    var a,
        b,
        i,
        val = this.value;
    /*close any already open lists of autocompleted values*/

    closeAllLists();

    if (!val) {
      return false;
    }

    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/

    this.parentNode.appendChild(a);
    /*for each item in the array...*/

    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].Name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/

        b.innerHTML = "<strong>" + arr[i].Name.substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].Name.substr(val.length);
        b.innerHTML += " (" + arr[i].Id + ")";
        /*insert a input field that will hold the current array item's value:*/

        b.innerHTML += "<input type='hidden' class='autoItem' value='" + arr[i].Name + "'><input type='hidden' class='hidden' value='" + arr[i].Id + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/

        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;

          if (inpId) {
            inpId.value = this.getElementsByTagName("input")[1].value;
          }
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/


          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/

      addActive(x);
    } else if (e.keyCode == 38) {
      //up

      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/

      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();

      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/

    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/

    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");

    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/


  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}