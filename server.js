const net = require('net');
const parser = require('./parse.js')

const portNum = +process.env.PORT;
console.log('Using port ' + portNum);

const server = net.createServer((socket) => {
    console.log(`New client connected from ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => {
        console.log(`Received data: ${data.toString()}`);
        parser.parseString(data.toString());
        socket.write("Server received ok");
        console.log("Done\n\n")
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(portNum, '0.0.0.0', () => {
    const address = server.address();
    console.log(`Server running at ${address.address}:${address.port}`);
});
