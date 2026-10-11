// import {WebSocketServer} from 'ws';

// const wss=new WebSocketServer({ port: 8080 });


// //event handler
// wss.on('connection',function (socket){
//     console.log('Client connected');
//     socket.send('Welcome to the WebSocket server!');
   

//     socket.on('message',(e)=>{
// if(e.toString()==="ping"){
//     socket.send('pong');
// };
//     })
// })


import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        // @ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            console.log("user joined room " + parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }

        if (parsedMessage.type == "chat") {
            console.log("user wants to chat");
            // const currentUserRoom = allSockets.find((x) => x.socket == socket).room
            let currentUserRoom = null;
            for (const user of allSockets) {
                if (user.socket === socket) {
                    currentUserRoom = user.room;
                }
            }

            for (const user of allSockets) {
                if (user.room === currentUserRoom) {
                    user.socket.send(parsedMessage.payload.message);
                }
            }
        }

    })

})

