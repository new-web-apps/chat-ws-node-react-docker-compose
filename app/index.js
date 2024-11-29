const WebSocket = require('ws');

const server = new WebSocket.Server({
        port: 8081
    },
    () => {
        console.log('Server started on port 8081');
    }
);

const users = new Set();

function sendMessage (message) {
    users.forEach((user) => {
        user.ws.send(JSON.stringify(message));
    });
}

server.on('connection', (ws) => {
    console.log('connected')
    const userRef = {
        ws,
    };
    users.add(userRef);

    ws.on('message', (message) => {
        console.log(message);
        try {

            // Parsing the message
            const data = JSON.parse(message);

            // Checking if the message is a valid one

            if (
                typeof data.sender !== 'string' ||
                typeof data.body !== 'string'
            ) {
                console.error('Invalid message');
                return;
            }

            // Sending the message

            const messageToSend = {
                sender: data.sender,
                body: data.body,
                sentAt: Date.now()
            }

            sendMessage(messageToSend);

        } catch (e) {
            console.error('Error passing message!', e)
        }
    });

    ws.on('close', (code, reason) => {
        users.delete(userRef);
        console.log(`Connection closed: ${code} ${reason}!`);
    });
});