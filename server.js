const net = require('net');
const os = require('os')
const parseString = require('./parse.js');

let hostIp;
// utility functions
const interfaces = os.networkInterfaces();
const getNetworkAddress = () => {
	for (const name of Object.keys(interfaces)) {
		for (const interface of interfaces[name]) {
			const {address, family, internal} = interface;
			if (family === 'IPv4' && !internal) {
				return address;
			}
		}
	}
};


try {
  hostIp = String(getNetworkAddress());
} catch (err) {
  console.log(err)
  exit(1);
}

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
server.listen(8080, () => {
  const { port } = server.address();
  console.log('Running at http://localhost:' + String(port) + ", on your network: http://" + String(hostIp) + ":" + String(port));
});
