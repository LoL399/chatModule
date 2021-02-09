let Chat = require("../models/chatDetails");
const { decodeToken } = require("./loginHandler");
let responeData = require("./responeData") 

const create = async (req, res) => {
    try {
        const { content, replyTo, fromUser, userRoom } = req.body;

        var newChat = {
            content: content,
            fromUser: fromUser,
            UserRoom: userRoom
        };

        if(replyTo)
        {
            newChat.replyTo = replyTo
   
        }
        const chatNew = new Chat(newChat);
        chatNew.save()
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

const getAll = async (req, res) =>{

    try {

        Chat.find().populate("byUser","name")
        .then( async (chat)=>{
            // console.log(roles)
            let data =  await responeData.createData(0,chat, process.env.SUCCESS)
            return res.status(200).json(data)
        })
        .catch(async (err)=>{
            // console.log(err)
            let data =  await responeData.createData(1,null,err)
            return res.status(200).json(data)
        })
        
    } catch (error) {
        return res.status(400)
    }

}



const getByUser = async (req, res) =>{

    try {
        
        const {id} = req.params
        const {skip} = req.body
        // some condition ?


        Chat.find({UserRoom: id }).select("-_id").sort( {createdAt: -1}).limit(skip)
        .then( async (chat)=>{
            let data =  await responeData.createData(0,chat.reverse(), process.env.SUCCESS)
            return res.status(200).json(data)

        })
        .catch(async (err)=>{
            // console.log(err)
            let data =  await responeData.createData(1,null,err)
            return res.status(200).json(data)
        })
        
    } catch (error) {
        return res.status(400)
    }

}



const getbyRoom = async (req, res) =>{
    try {
        const {id}= req.params
        const {skip}=req.body
        Chat.find({UserRoom: id}).sort( {createdAt: -1}).populate({path: "UserRoom"}).populate("fromUser", "name").limit(skip).then( async (chat)=>{

            if(chat.length === 0)
            {
                console.log("empty")

            }
            else
            {
                let data =  await responeData.createData(0,chat.reverse(), process.env.SUCCESS)
                return res.status(200).json(data)
            }

        })
        .catch(async (err)=>{
            console.log(err)
        //   let data =  await responeData.createData(1,null,err)
        //   return res.status(200).json(data)
        })

        
    } catch (error) {
        
    }
}


const getRoomList = async (req, res) =>{
    try {
        console.log("Here")

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1]

        const id = await decodeToken(token)

        if(authHeader)
        {
          const token = authHeader.split(' ')[1]
          Chat.find({attendants: id}).then( async (chat)=>{

            // let list = []
              
            // for await ( x of chat)
            // {
            //     if(!list.includes(x.UserRoom))
            //     {
            //         list.push(x.UserRoom)
            //     }
            // }
            //   console.log(list)
              let data =  await responeData.createData(0,chat, process.env.SUCCESS)
              return res.status(200).json(data)
          })
          .catch(async (err)=>{
              // console.log(err)
            //   let data =  await responeData.createData(1,null,err)
            //   return res.status(200).json(data)
          })
        }

        
    } catch (error) {
        
    }
}



const getOne = async (req, res) =>{
    try {

        const {skip} = req.body
        Chat.findById(req.params.id).populate("room","byUser").limit(skip)
        .then( async (request)=>{
            // console.log(roles)
            let data =  await responeData.createData(0,request, process.env.SUCCESS)
            return res.status(200).json(data)
        })
        .catch(async (err)=>{
            // console.log(err)
            let data =  await responeData.createData(1,null,err)
            return res.status(200).json(data)
        })
        
    } catch (error) {
        return res.status(400)
    }

}


module.exports = {create, getByUser,getOne,getAll,getRoomList,getbyRoom}