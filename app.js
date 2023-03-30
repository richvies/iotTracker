const net = require('net');

const data = "#666198059727390#MT710#0000#AUTO#1#38#$GPRMC,105721.00,A,2238.3071,N,11401.7575,E,,96.70,250321,,,A*74"

const client = new net.Socket();

client.connect(8080, 'localhost', () => {
  console.log('Connected to server');
});

client.on('data', (data) => {
  console.log(`Received data: ${data.toString()}`);
});

client.on('close', () => {
  console.log('Connection closed');
});

// Send data to the server every 10 seconds
setInterval(() => {
  client.write(data);
}, 5000);
