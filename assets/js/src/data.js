export { getEvents, getEventDetails, getRegistrants, getCountRegistrants };



function getEvents() {
    return fetch("/example/list/json")
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



