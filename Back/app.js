const cors = require("cors");
const express = require("express");
const { decodeToken } = require("./database/controllers/loginHandler");
// var cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
let bodyParser = require("body-parser");
const responseTime = require("response-time");
const axios = require("axios");
const redis = require("redis");
const {promisify} = require('util');
const roles = require("./database/models/roles");
require('dotenv').config();
const port = process.env.PORT || 7000;
const redisPort = process.env.PORT || 6379;
const chatHandle = require("./chatSocket/chat")
const reqHandle = require("./chatSocket/request")
// const client = redis.createClient(redisPort);
const app = express();

// const GET_ASYNC = promisify(client.get).bind(client)
// const SET_ASYNC = promisify(client.set).bind(client)
 

const adminRouter = require("./controller/admin/route");
const defaultRouter = require("./controller/auth/route");
const userRouter = require("./controller/user/route");
const { login } = require("./database/controllers/loginHandler");


app.use(responseTime());
// cors and shit
app.use(cors());
// app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());




const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connection established successfully");
});

//io for socket
const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: {origin: "*"}
})
// let count = 0

// const getOnlineUsers = ()=>{
//   let clients = io.socket.clients().connected;
//   let sockets = Object.values(clients)
//   let users = socket.map(s=>s.user);
//   return users
// }

io.on('connection', async (socket) =>{
    // console.log(`a user connected ${socket.id}`)

    socket.on('getID', token =>{
      console.log(decodeToken(token))
    })


    socket.on('message', async (mess) =>{

        let newChat = await chatHandle.create(mess,io)
        // let updateRoom = await chatHandle.updateLatest(newChat,io)
        io.emit('PushUp',mess.UserRoom)
      // io.emit(`${mess.UserRoom}`, `${socket.id}`)
    })

    socket.on('seen',async (data) =>{
      console.log(data)
      chatHandle.updateSeen(data, io)
    })
    socket.on('newReq', async (data)=>{
      console.log(data)
      reqHandle.create(data,io)

    })
    socket.on(`GTFO`, async (data) => {
      chatHandle.GTFO(data, io)
    })
})

//route
app.use("/admin", adminRouter);
app.use("/",defaultRouter);
app.use("/user",userRouter );



// app.use('/rocket', async(req, res, next)=>{

//   const reply = await GET_ASYNC('rocket')
  
//   if(reply){
//     console.log('using cached data')
//     res.status(200).json(reply)
//     return
//   }

//   const respone = await axios.get('https://api.spacexdata.com/v3')
//   const saveResult = await SET_ASYNC('rocket', JSON.stringify(respone.data), 'EX', 5)
//   console.log('new data', saveResult)
//   res.status(200).json(respone.data)
// })


// app.use('/role', async(req, res)=>{
//   let role = {
//     name: "Master"
//   }
//   const newrole = new roles(role);
//   newrole.save().then(()=>res.status(200).json({err: 0, data: "Ok"})).catch(()=>res.status(200).json({err: 1, data: "Not ok"}))
// })

http.listen(8080,()=>console.log("socket-connect"))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });