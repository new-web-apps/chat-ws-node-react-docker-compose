const WebSocket = require('ws');

const server = new WebSocket.Server({
        port: 8080
    },
    () => {
        console.log('Server started on port 8080');
    }
);
