const net = require('net');
const parseString = require('./parse.js');

const server = net.createServer((socket) => {
  // Handle incoming connections here
  console.log(`New client connected from ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => {
    // Handle incoming data here
    console.log(`Received data: ${data.toString()}`);
    parseString(data.toString());
    socket.write("Server received ok");
    console.log("Done\n\n")
  });

  socket.on('end', () => {
    // Handle disconnected clients here
    console.log('Client disconnected');
  });
});

// Start listening on port 8080
server.listen(0, '85.255.16.188', () => {
  const address = server.address();
  console.log(`Server running at ${address.address}:${address.port}`);
});
