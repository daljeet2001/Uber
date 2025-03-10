const http = require('http');
const app = require('./app');
const WebSocket = require('ws');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', ws => {
    console.log("Client connected to Captain Service");
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        const data = JSON.parse(message);

        if (data.type === 'join') {
            console.log(`Captain ${data.userId} joined`);
            // Handle join logic here
            // if (userType === 'captain') {
            //     await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            // }
        } else if (data.type === 'update-location-captain') {
            console.log(`Captain ${data.userId} updated location to ${data.location.ltd}, ${data.location.lng}`);
            // Handle location update logic here
        }

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Captain Update: ${message}`);
            }
        });
    });
    ws.on('close', () => {
        console.log("Client disconnected from Captain Service");
    });
    ws.on('error', error => {
        console.error(`WebSocket error: ${error}`);
    });
});

server.listen(port, () => {
    console.log(`Captain service is running on port ${port}`);
});

server.on('error', error => {
    console.error(`Server error: ${error}`);
});




