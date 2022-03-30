//backend application framework for nodejs
import express from 'express';
import {createServer} from 'http';
import {Server} from 'ws';

import {UserController} from './controller';

//create express application
const app = express();

//initialize a simple http server
const server = createServer(app);

//initialize the WebSocket server instance
const wss = new Server({ server });


//incoming data is being parsed to a json object
app.use(express.json());

//to better decode routes
app.use(express.urlencoded({ extended: true }));

//evtl später
//app.use(cookieParser());

const controller = new UserController(app, (dataToBroadcast: string) => {
    wss.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
            console.log('Server: Sending data...');
            client.send(dataToBroadcast);
        }
    });
})

// //Websocket
// wss.on('connection', (ws: WebSocket) => {

//     //connection is up, let's add a simple event
//     //ws.on('message', (message: string) => {

//     //log the received message and send it back to the client
//     //    console.log('webSocketServer: Received: %s', message);
//     //ws.send('Hello, you sent -> ${message}');
//     //});

//     //Console-notification upon new connection
//     ws.on('open', () => {

//         //log the received message and send it back to the client
//         console.log('WebSocketServer: New connection');
//         //ws.send('Hello.');
//     });

//     //Console-notification upon closed connection
//     ws.on('close', () => {

//         //log the received message and send it back to the client
//         console.log('WebSocketServer: Closed connection');
//     });

//     //send immediatly a feedback to the incoming connection 
//     console.log('WebSocketServer: New connection');
//     ws.send('Hi there, I am a WebSocket server');
// });

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log('Server: Started at %s', server.address());
});