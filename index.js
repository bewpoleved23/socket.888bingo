require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const http = require('http');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie');
const socket = require('socket.io');
const app = express();

const {JackpotController} = require('./controllers');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const server = http.createServer(app).listen(port, function(err){
    if(err){
        console.error(err);
    } else {
        console.log('listening to port ',port);
    };
});

const io = new socket.Server(server, {
    cors:{
        origin: ["http://localhost:5000","https://uat.888bingo.ph","https://888bingo.ph"],
        methods: ["GET", "POST"] ,
        credentials: true
    }
});


io.on('connection',(socket)=>{
    socket.emit('message', {message:`connected to socket server with id ${socket.id}`});
});

io.of('/lobby').on('connection',(socket)=>{
    try {

 
        const cookie = socket.handshake.headers.cookie;

        
        const parsed = cookie?cookieParser.parse(cookie):{};
        socket.emit('message', {message:`connected to socket server with id ${socket.id}`, cookie:socket.handshake.headers.cookie});
        socket.on('/update-jackpot', async (arg, callback)=>{
            let jackpot = await JackpotController.getMainJackpot();

            if(jackpot.status){

                callback({data:jackpot.data.data.data});
            } else {
                callback({data:0});
            }
        });
        socket.on('/update-player', (arg, callback)=>{

        });

        socket.on('disconnect',function(){
            console.log('disconnected');
        })

    }catch(err){
        console.log(63, err);
    };
});

io.of('/admin').on('connection',(socket)=>{
    
    try {
        const cookie = socket.handshake.headers.cookie;
        if (!(cookie)){
            return;
        };
        const parsed = cookieParser.parse(cookie);
        socket.emit('message', {message:`connected to socket server with id ${socket.id}`, cookie:socket.handshake.headers.cookie});
        socket.on('/active-player', (arg, callback)=>{

        });

    }catch(err){
        console.log(63, err);
    };
});

app.post('/send',function(req, res, next){
    const nsp = req.query.nsp;
    const body = req.body;

    if(nsp){
        io.of(nsp).emit('message', body);
        res.json({message:'success'});
    } else {
        io.emit('message', body);
        res.json({message:'success'});
    }
});
