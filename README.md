# RequestProtocolsShowcase

Sample Apps for MQTT, Socket and REST protocols



### How to run examples:

| On `root` level run `npm install` |



#### HTTP

- `cd HTTP-Request`

- `npm install`

- Open `serverHTTPRequest.js` and edit it to look like below

  ```javascript
  const server = Hapi.server({
      host: 'http://localhost',
      port: 8000
  });
  ```

- save it and run `node serverHTTPRequest.js`

- Open the `clientHTTPRequest.js` and edit it to look like below

  ```javascript
  postData('http://localhost:8000/hello', body)
  ```

- Open the `index.html` in the browser from a local server (XAMPP, MAMPP, Express, etc)

- Click on the **Send Request** button



#### MQTT

- `cd MQTT-Request`

- run `npm install`

- run `node mqttServer.js`

- Open the mqttClient.js` file and edit it to look like below

  ```javascript
  var client = mqtt.connect({ port: 3000, host: "localhost", "protocolId": "MQTT", keepalive: 10000 });
  ```

- Save it and open the `index.html` in the browser from a local server (XAMPP, MAMPP, Express, etc)

- Click on the **Send Request** button



#### Socket

- `cd Socket-Request`

- run `npm install`

- run `node serverSocketConnect.js`

- Open `clientSocketConnect.js` and edit it to look like below

xxxxxxxxxx const socket = io('http://localhost:8080'); 

- Open the `index.html` in the browser from a local server (XAMPP, MAMPP, Express, etc)

- Click on the **Send Request** button


