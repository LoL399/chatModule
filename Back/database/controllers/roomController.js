let Room = require("../models/roomDetail");
const { decodeToken } = require("./loginHandler");
let responeData = require("./responeData") 

const create = async (req, res) => {
    try {
        const { attendants } = req.body;

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1]

        const id = await decodeToken(token)

        var newRoom = {
            attendants: [id, attendants],
        };

        const room = new Room(newRoom);

        room.save().then()
        .then( async () => {
            console.log("Add chat")
            let data = await responeData.createData(0,"","Success")
            res.status(200).json(data)
        })
        .catch(async (err) => {
            console.log("Err in add user")
            let data =  await responeData.createData(1,"",err)
            res.status(200).json(data)
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json("error")
    }

};


const createbyUser = async (req, res) => {
    try {
        const { token } = req.body;
        const id = await decodeToken(token)

        var newRoom = {
            attendants: [id, "600beac1a0d77f29b40678f2"] //Kinda lazy so yeah ... fuck this
        };

        const room = new Room(newRoom);
        let saveRoom = await room.save()
        let data = await responeData.createData(0,saveRoom,"Success")
        res.status(200).json(data)
        // console.log({room})
        // room.save().then()
        // .then( async () => {
        //     console.log("Add chat")
        //     let data = await responeData.createData(0,"","Success")
        //     res.status(200).json(data)
        // })
        // .catch(async (err) => {
        //     console.log("Err in add user")
        //     let data =  await responeData.createData(1,"",err)
        //     res.status(200).json(data)
        // })
    } catch (error) {
        console.log(error)
        return res.status(200).json("error")
    }

};

const newChat = async(newChat) =>{
    try {

        const {UserRoom, _id} = newChat
        Room.find({UserRoom: UserRoom}).then(async (room) =>{
            room.lastSeenChat = _id
            room.save()
            .then()
            .catch()
        })
        
    } catch (error) {
        
    }
}


const changeRoomStatus = async (req, res) => {
    try {
        const { id } = req.body;

        Room.findById(id).then(async(room)=>{
            if(room){
                room.hidden = !room.hidden
            }
            room.save()
            .then( async () => {
                console.log("Add chat")
                let data = await responeData.createData(0,"","Success")
                res.status(200).json(data)
            })
            .catch(async (err) => {
                console.log("Err in add user")
                let data =  await responeData.createData(1,"",err)
                res.status(200).json(data)
            })
        })

    } catch (error) {
        console.log(error)
        return res.status(200).json("error")
    }

};
const getRoomByUser = async (req,res) =>{
    try {
        const {token} = req.body
        const id = await decodeToken(token)
        Room.find({attendants: id}).populate("attendants", "_id name").populate("lastSeenChat", "_id fromUser").then(async(room)=>{
            let data =  await responeData.createData(0,room, process.env.SUCCESS)
            return res.status(200).json(data)
        })          
        .catch(async (err)=>{
            console.log(err)
            let data =  await responeData.createData(1,null,err)
            return res.status(200).json(data)
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

const getAll = async (req, res) =>{
    try {

          Room.find().populate({
            path: 'attendants',
        }).then( async (room)=>{
            console.log("list", room)
            let data =  await responeData.createData(0,room, process.env.SUCCESS)
            return res.status(200).json(data)
          })
          .catch(async (err)=>{
              console.log(err)
            //   let data =  await responeData.createData(1,null,err)
            //   return res.status(200).json(data)
          })

        
    } catch (error) {
        console.log(error)
        
    }
}

const getRoomList = async (req, res) =>{
    try {
        console.log("Here")
        const {token} = req.body
        const id = await decodeToken(token)

        if(id)
        {
          Room.find({attendants: id}).populate("attendants", "_id name").populate("lastSeenChat", "_id fromUser createdAt").then( async (room)=>{
            console.log("list", room)
            let data =  await responeData.createData(0,room.reverse(), process.env.SUCCESS)
            return res.status(200).json(data)
          })
          .catch(async (err)=>{
              console.log(err)
            //   let data =  await responeData.createData(1,null,err)
            //   return res.status(200).json(data)
          })
        }

        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {create, createbyUser,getAll, changeRoomStatus,getRoomList,getRoomByUser,newChat}
