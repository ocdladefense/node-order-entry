/** @jsx vNode */

export { switchToList, switchOrder, doSearch, saveOrderItem };


import { vNode, updateElement } from '../../../node_modules/@ocdladefense/view/view.js';
import { CACHE, HISTORY } from '../../../node_modules/@ocdladefense/view/cache.js';


import { OrderItems, HomeFullNode }  from './components.js';
import { getOrders, getOrder, getSingleOrder } from './data.js';


function switchOrder(props) {
    //render just the right side, not everything

    let orderItems = getOrder(props.recordId);
    let singleOrder = getSingleOrder(props.recordId);
    let theList = getOrders();
    
    return Promise.all([orderItems, theList, singleOrder]).then(function(data) {
        console.log("promise finished");

        return <HomeFullNode orders={data[1]} order={data[2]} orderItems={data[0]} />;
        //return <OrderItems orders={data[1]} order={data[2]} orderItems={data[0]} />;
    });

}


function saveOrderItem(props) {
    console.log(props);
    //console.log("document.getElementById(props.recordId)");
    //extract, autofill, validateBeforeSave, save
    //{"orderId":order.Id, "orderItem":orderItem.Id}
    let obj = extractOrderItemData(props.recordId);
    obj = autofill(obj);
    if (validateBeforeSave(obj)) {
        save(obj)
            .then(updateElement)
            .catch(function (e) {window.alert(e);});
    }

    //orderitemId:

    let orderItems = getOrder(props.orderitemId);
    let singleOrder = getSingleOrder(props.orderitemId);
    let theList = getOrders();
    
    return Promise.all([orderItems, theList, singleOrder]).then(function(data) {
        console.log("promise finished");

        return <HomeFullNode orders={data[1]} order={data[2]} orderItems={data[0]} />;
        //return <OrderItems orders={data[1]} order={data[2]} orderItems={data[0]} />;
    });
}
//Id, Product2Id, Note_1__c, Note_2__c, Note_3__c, FirstName__c, LastName__c, ExpirationDate__c, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItem WHERE OrderId = '$Id'"

function extractOrderItemData(recordId) {
    let row = document.getElementById(recordId);

    let contact = row.getElementsByClassName("contact")[0];
    let contactId = "0030a00001V0uTWAAZ"; //Elijah R.L. Brown
    let productId = "01t0a000004Ov6bAAC"; //CLE Archive: 2015 House Bill 2320 (Package)

    let expiration = row.getElementsByClassName("expiration")[0];
    let product = row.getElementsByClassName("product")[0];
    let description = row.getElementsByClassName("description")[0];
    let note1 = row.getElementsByClassName("note1")[0];
    let note2 = row.getElementsByClassName("note2")[0];
    let note3 = row.getElementsByClassName("note3")[0];
    let unitprice = row.getElementsByClassName("unitprice")[0];
    let quantity = row.getElementsByClassName("quantity")[0];
    let subtotal = row.getElementsByClassName("subtotal")[0];

    let expirationValue = expiration.value;
    let productValue = product.value;
    let descriptionValue = description.value;
    let note1Value = note1.value;
    let note2Value = note2.value;
    let note3Value = note3.value;
    let unitpriceValue = unitprice.value;
    let quantityValue = quantity.value;
    let subtotalValue = subtotal.value;

    return {"Id":recordId, "Product2Id":productId, "Contact__c":contactId, "Description":descriptionValue, "Note_1__c":note1Value, "Note_2__c":note2Value, "Note_3__c":note3Value, "ExpirationDate__c":expirationValue, "Product2Name":productValue, "UnitPrice":unitpriceValue, "Quantity":quantityValue, "TotalPrice":subtotalValue};
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

    if (demoErrors) {
        return Promise.reject("salesforce has encountered an error");
        //throw new Error("salesforce has encountered an error");
    } else {
        console.log("saved");
        return Promise.resolve({Id:"foobar"});
    }

}



///getstufflike price based off of product id, giving quantity totalrpice 
//function called update total price, called here and in events where we look for updated text














function switchToDetails(id) {
    let event = getEventDetails(id);
    // let contacts = getRegistrants(id);
    
    return Promise.all([event]).then(function(data) {
        document.getElementById("switchButton").classList.value = "switchButton";

        //return <EventFull event={data[0]} />;// contacts={data[1]} />;
    });
}



function switchToList() {
    document.getElementById("switchButton").classList.value = "hiddenButton";

		// Need to change this function call to getLast();
    return Promise.resolve(HISTORY.getRecent(1));
}


function doSearch(stringEntered, orderDatesAcs, orderAttendeesDesc) {
    let cached = CACHE.get("events");
    let copied = JSON.parse(JSON.stringify(cached));
    let results = copied.filter(event => doesEventFit(event, stringEntered));

    if (orderDatesAcs == true) {
        results.sort(oldestToNewestSort);
    }
    if (orderAttendeesDesc == true) {
        results.sort(contactsHighestToLowest);
    }

    //let virtualNodes = <div><EventListFull events={results} searchBar={stringEntered} datesChecked={orderDatesAcs} contactsChecked={orderAttendeesDesc} /></div>;
    
    return Promise.resolve(virtualNodes);
}




function doesEventFit(testedEvent, stringEntered) {
    if (testedEvent.Name && testedEvent.Name.toLowerCase().includes(stringEntered.toLowerCase()) || testedEvent.Banner_Location_Text__c && testedEvent.Banner_Location_Text__c.toLowerCase().includes(stringEntered.toLowerCase())) {
        return true;
    }
    else {
        return false;
    }
}



function oldestToNewestSort(a, b) {
    if (a.Start_Date__c < b.Start_Date__c) {
        return -1;
    }
    if (a.Start_Date__c > b.Start_Date__c) {
        return 1;
    }
    else {
        return 0;
    }

}



function contactsHighestToLowest(a, b) {
    
    let count = CACHE.get("eventsContactCount");
    let aCount = count[a.Id] && count[a.Id].expr0;
    let bCount = count[b.Id] && count[b.Id].expr0;

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




