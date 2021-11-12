export { getOrders, getOrder, getSingleOrder, getEventDetails, getRegistrants, getCountRegistrants };

function getOrders() {
  return fetch("/orderentry/orders").then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getOrder(Id) {
  return fetch("/orderentry/orderitems/" + Id).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    return data;
  });
}

function getSingleOrder(Id) {
  return fetch("/orderentry/singleorder/" + Id).then(function (resp) {
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