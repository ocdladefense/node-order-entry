// import { jsDateFormatter, slqDateFormatter, numberIntoMonth } from '@ocdladefense/view';

console.log("index");
console.log(numberIntoMonth(10));

function getListofEvents() {
    return fetch("/events/eventlistjson")
    .then(resp => resp.json())
    .then(data => {return data;});
}

getListofEvents();



