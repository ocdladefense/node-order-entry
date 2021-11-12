export { getOrders, getOrder, getSingleOrder, getEventDetails, getRegistrants, getCountRegistrants };



function getOrders() {
    return fetch("/orderentry/orders")
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getOrder(Id) {
    return fetch("/orderentry/orderitems/" + Id)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getSingleOrder(Id) {
    return fetch("/orderentry/singleorder/" + Id)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getEventDetails(queryId) {
    return fetch("/example/details/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getRegistrants(queryId) {
    return fetch("/events/eventcontactlistjson/" + queryId)
    .then(resp => resp.json())
    .then(data => {return data;});
}

function getCountRegistrants() {
    return fetch("/events/eventcontactcountjson")
    .then(resp => resp.json())
    .then(data => {return data;});
}



