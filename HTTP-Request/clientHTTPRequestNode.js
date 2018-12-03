// https://www.npmjs.com/package/node-fetch

const fetch = require('node-fetch');

function sendRequest() {
    var _date = new Date();
    var date = _date.getTime()
    const body = {
        "message": "Hello HTTP-Request!",
        "clientTimeInMS": date,
        "timestamp": _date.toISOString()
    }

    fetch('http://testmachine.fr-1.paas.massivegrid.net:8000/hello', {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => console.log(json));

}

sendRequest();