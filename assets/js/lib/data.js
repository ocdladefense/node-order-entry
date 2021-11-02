export { getEvents, getEventDetails, getRegistrants, getCountRegistrants };

function getEvents() {
  return fetch("/example/list/json").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getEventDetails(queryId) {
  return fetch("/example/details/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getRegistrants(queryId) {
  return fetch("/events/eventcontactlistjson/" + queryId).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getCountRegistrants() {
  return fetch("/events/eventcontactcountjson").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}