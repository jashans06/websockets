import {WebSocketServer} from 'ws';

const wss=new WebSocketServer({ port: 8080 });


//event handler
wss.on('connection',function (socket){
    console.log('Client connected');
    socket.send('Welcome to the WebSocket server!');
   

    socket.on('message',(e)=>{
if(e.toString()==="ping"){
    socket.send('pong');
};
    })
})

