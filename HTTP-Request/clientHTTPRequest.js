// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

function httpConnect() {

    function sendRequest() {
        var _date = new Date();
        var date = _date.getTime()
        const body = {
            "message": "Hello HTTP-Request!",
            "clientTimeInMS": date,
            "timestamp": _date.toISOString()
        }

        postData('http://testmachine.fr-1.paas.massivegrid.net:8000/hello', body)
            .then(dataFromServer => {
                console.log(dataFromServer);
                let serverTime = Number(dataFromServer["serverTimeInMS"]);
                let clientTime = Number(dataFromServer["clientTimeInMS"]);
                let diff = serverTime - clientTime;
                console.log("latency is: " + diff + " in ms ");
                jQuery("#request-block-container").append("<div class='block container with-title'><h2 class='title'>HTTP Request</h2> Latency: " + diff + " - Server Timestamp: " + dataFromServer["serverTimestamp"] + " - Client Timestamp: " + dataFromServer["timestamp"] + "</div>");
            }) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
    }

    /**
     *
     *
     * @param {string} [url='']
     * @param {*} [data={}]
     * @returns
     */
    function postData(url = '', data = {}, doneCallback, failCallback) {
        // Default options are marked with *
        var basicOptions = {
            type: 'POST',
            method: 'POST',
            crossOrigin: false,
            dataType: "json",
            url: url,
            contentType: "application/json"
        };
        var options = _.clone(basicOptions);
        options.data = JSON.stringify(data);

        var request = jQuery.ajax(options)
            .done(function(response) {
                //console.log(response);
                if (doneCallback) {
                    doneCallback(response);
                }
            })
            .fail(function(response) {
                if (failCallback) {
                    failCallback(response);
                }
            });

        return request;
    }

    return {
        sendRequest: sendRequest
    }

}