/** @jsx vNode */

export { saveOrderItem, setUpAutoComplete };

import { vNode, updateElement, changeMainContainer } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';


import { OrderItems, HomeFullNode, SmallOrderList, OrderItem, LargeOrderList }  from './components.js';
import { getOrders, getOrderById, getOrderItems } from './data.js';



function saveOrderItem(props) {
    //console.log("called save");
    //extract, autofill, validateBeforeSave, save
    //{"orderId":order.Id, "orderItem":orderItem.Id}
    let obj = extractOrderItemData(props.recordId);
    //console.log(obj);
    obj = autofill(obj);
    if (validateBeforeSave(obj)) {
        save(obj)
            //.then(updateElement)
            .catch(function (e) {console.log("error message " + e);});
    }
    
    changeMainContainer("bottomListOrders");

    let theList = getOrders();
    let singleOrder = getOrderById(props.orderitemId);
    let orderItems = getOrderItems(props.orderitemId);
    let HomeFullNodeHolder;
    let OrderItemHolder;


    fillOrderItemData(obj);

    //return Promise.resolve();
    return Promise.all([theList, singleOrder, orderItems]).then(function(data) {
        //console.log("promise finished"); //This stuff is just to resolve an empty promise error
        //return <SmallOrderList orders={theList} />;
        //HomeFullNodeHolder = <HomeFullNode orders={data[0]} order={data[1]} orderItems={data[2]} />;
        //console.log(HomeFullNodeHolder);
        //OrderItemHolder = <OrderItem order={data[1]} orderItem={obj} />;

        return <LargeOrderList orders={data[0]} />;
        //return HomeFullNodeHolder;
        //return <OrderItems orders={data[1]} order={data[2]} orderItems={data[0]} />;
    });

}


//Id, Product2Id, Note_1__c, Note_2__c, Note_3__c, FirstName__c, LastName__c, ExpirationDate__c, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItem WHERE OrderId = '$Id'"

function extractOrderItemData(recordId) {
    //let contact = document.querySelector("#id-" + recordId + " .contact")[0];
    //let row = document.getElementById(recordId);

    //let contact = row.getElementsByClassName("contact")[0];
    //let contactId = "0030a00001V0uTWAAZ"; //Elijah R.L. Brown
    //let productId = "01t0a000004Ov6bAAC"; //CLE Archive: 2015 House Bill 2320 (Package)

    //only gets the first one?
    let contact = document.querySelector("#id-" + recordId + " .contact");
    let product = document.querySelector("#id-" + recordId + " .product");
    let contactId = document.querySelector("#id-" + recordId + " .contactId");
    let productId = document.querySelector("#id-" + recordId + " .productId");
    let expiration = document.querySelector("#id-" + recordId + " .expiration");
    let description = document.querySelector("#id-" + recordId + " .description");
    let note1 = document.querySelector("#id-" + recordId + " .note1");
    let note2 = document.querySelector("#id-" + recordId + " .note2");
    let note3 = document.querySelector("#id-" + recordId + " .note3");
    let unitprice = document.querySelector("#id-" + recordId + " .unitprice");
    let quantity = document.querySelector("#id-" + recordId + " .quantity");
    let subtotal = document.querySelector("#id-" + recordId + " .subtotal");

    let contactValue = contact.value;
    let productValue = product.value;
    let contactIdValue = contactId.value;
    let productIdValue = productId.value;
    let expirationValue = expiration.value;
    let descriptionValue = description.value;
    let note1Value = note1.value;
    let note2Value = note2.value;
    let note3Value = note3.value;
    let unitpriceValue = unitprice.value;
    let quantityValue = quantity.value;
    let subtotalValue = subtotal.value;

    return {"Id":recordId, "ContactName":contactValue, "Product2Name":productValue, "ContactId":contactIdValue, "Product2Id":productIdValue, "Description":descriptionValue, "Note_1__c":note1Value, "Note_2__c":note2Value, "Note_3__c":note3Value, "ExpirationDate__c":expirationValue, "UnitPrice":unitpriceValue, "Quantity":quantityValue, "TotalPrice":subtotalValue};
}

function fillOrderItemData(obj) {
  //{"Id":recordId, "Product2Id":productId, "Contact__c":contactId, "Description":descriptionValue, "Note_1__c":note1Value, "Note_2__c":note2Value, "Note_3__c":note3Value, "ExpirationDate__c":expirationValue, "Product2Name":productValue, "UnitPrice":unitpriceValue, "Quantity":quantityValue, "TotalPrice":subtotalValue};
  //console.log(obj["Id"]);
  
  //let row = document.getElementById(obj["Id"]);
  

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

function save(obj) {
    //fetch take data, put into json, returns promise?

    let demoErrors = false;
    let demoResponse = {Id:"000xtestbid24322"};

    if (demoErrors) {
        return Promise.reject("salesforce has encountered an error");
        //throw new Error("salesforce has encountered an error");
    } else {
        console.log("saved");
        return Promise.resolve({Id:"foobar"});
    }

}

var contactNames = [{Id:"0030a00001V0uTWAAZ", Name:"Elijah R.L. Brown"}, {Id:"0030a00001gICbsAAG", Name:"Mary Brownville"}, {Id:"0030a00001edgHuAAI", Name:"Edward Piper"}, {Id:"0030a00001V0uqmAAB", Name:"Zoe E. Bayham"}];
var productNames = [{Id:"01t0a000004Ov6bAAC", Name:"CLE Archive: 2015 House Bill 2320 (Package)"}, {Id:"01t0a000004Ov6eAAC", Name:"CLE Archive: 2014 Defending the Modern DUII"}, {Id:"01t0a000004Ov6fAAC", Name:"Search and Seizure Seminar???Nonmember Lawyer"}, {Id:"01t0a000004Ov6qAAC", Name:"Ardent Advocate 2016???Nonmember Lawyer"}];

//var currentIds = [];


window.setUpAutoComplete = setUpAutoComplete;

function setUpAutoComplete() {
    console.log("auto");
    //await new Promise(r => setTimeout(r, 1000)); //a promise . then would probably be better
    let arrayOfElements = document.getElementsByClassName("autocomplete");
    //console.log(arrayOfElements);


    
    for (let i = 0; i < arrayOfElements.length; i++) {
        let mainElementId = arrayOfElements.item(i).id;
        
        let mainElementContact = document.querySelector("#" + mainElementId + " .order-item-contact .contact");
        let mainElementProduct = document.querySelector("#" + mainElementId + " .order-item-product .product");

        if (mainElementContact) {
          let contactId = document.querySelector("#" + mainElementId + " .contactId");
          autocomplete(mainElementContact, contactNames, contactId);
        }
        if (mainElementProduct) {
          let productId = document.querySelector("#" + mainElementId + " .productId");
          autocomplete(mainElementProduct, productNames, productId);
        }

    }
    return false;
}



function autocomplete(inp, arr, inpId = null) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
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
            b.addEventListener("click", function(e) {
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
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
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
      if (currentFocus < 0) currentFocus = (x.length - 1);
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
  
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  //autocomplete(document.getElementById("experation"), productNames);

///getstufflike price based off of product id, giving quantity totalrpice 
//function called update total price, called here and in events where we look for updated text