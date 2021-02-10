let Chat = require("../database/models/chatDetails")
let Room = require("../database/models/roomDetail")
let responeData = require("../database/controllers/responeData") 
const { decodeToken } = require("../database/controllers/loginHandler");

const create = async (data,io) => {
    try {
        const { content, replyTo, fromUser, UserRoom } = data;

        var newChat = {
            content: content,
            fromUser: decodeToken(fromUser),
            UserRoom: UserRoom
        };

        if(replyTo)
        {
            newChat.replyTo = replyTo
   
        }
        const chatNew = new Chat(newChat)
        const a = await chatNew.save().then(async()=>{
            Chat.findById(chatNew._id).populate("fromUser", "name").then(async(chat)=>{
            // console.log(saveChat)
            updateLatest(chat,io)
            io.emit(`${data.UserRoom}`, chat)

            })
        })        



    } catch (error) {
        console.log(error)

    }

};




const updateLatest = async(newChat,io) =>{
    try {

        const {UserRoom, _id} = newChat
        Room.findById(UserRoom).then(async (room) =>{
            
            room.lastSeenChat = _id
            let a = await room.save()
            a.attendants.forEach(element => {
                io.emit(`${element}`, 0)
              });
        })
        
        
    } catch (error) {
        console.log(error)
        
    }

}

const updateSeen = async(data,io) =>{
    try {
        const {roomId, token} = data
        const id = decodeToken(token)
        console.log(id)
        // const {UserRoom, _id} = newChat
        if(id){
            Room.findById(roomId).populate("lastSeenChat", "fromUser").then(async (room) =>{
                if(room.lastSeenChat)
                {
                    if(room.attendants.includes(id) && room.lastSeenChat.fromUser !== id)
                    {
                        room.lastSeenChat = undefined
                        let a = await room.save()
                        a.attendants.forEach(element => {
                            io.emit(`${element}`, 0)
                        });
                        
                    }
                }

            })

        }

        
    } catch (error) {
        
    }
}

const GTFO = async (data,io) => {
    try {
        const {token,roomId} = data
        const id = await decodeToken(token)

        if(id)
        {
          Room.findById(roomId).then( async (room)=>{
    
            if(room.attendants.includes(id))
            {
                room.attendants.pop(id)
                // room.attendants = a
                room.save().then(async ()=>{
                    io.emit(`${id}`,0)
                })
            }
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






// const getAll = async (req, res) =>{

//     try {
//         Chat.find().populate("byUser","name")
//         .then( async (chat)=>{
//             // console.log(roles)
//             let data =  await responeData.createData(0,chat, process.env.SUCCESS)
//             return res.status(200).json(data)
//         })
//         .catch(async (err)=>{
//             // console.log(err)
//             let data =  await responeData.createData(1,null,err)
//             return res.status(200).json(data)
//         })
        
//     } catch (error) {
//         return res.status(400)
//     }

// }



// const getByUser = async (req, res) =>{

//     try {
//         const {id} = req.params

//         // some condition ?


//         Chat.find({UserRoom: id })
//         .then( async (chat)=>{
//             let data =  await responeData.createData(0,chat, process.env.SUCCESS)
//             return res.status(200).json(data)

//         })
//         .catch(async (err)=>{
//             // console.log(err)
//             let data =  await responeData.createData(1,null,err)
//             return res.status(200).json(data)
//         })
        
//     } catch (error) {
//         return res.status(400)
//     }

// }



// const getOne = async (req, res) =>{
//     try {
//         Chat.findById(req.params.id).populate("room","byUser")
//         .then( async (request)=>{
//             // console.log(roles)
//             let data =  await responeData.createData(0,request, process.env.SUCCESS)
//             return res.status(200).json(data)
//         })
//         .catch(async (err)=>{
//             // console.log(err)
//             let data =  await responeData.createData(1,null,err)
//             return res.status(200).json(data)
//         })
        
//     } catch (error) {
//         return res.status(400)
//     }

// }


module.exports = {create,updateLatest,updateSeen, GTFO}