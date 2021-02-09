let Request = require("../models/requests")
let User = require("../models/users")
let responeData = require("./responeData") 
const { decodeToken } = require("./loginHandler");


const create = async (req, res) => {
    try {
        const { problem, token,room, handleBy } = req.body;
        const byUser = decodeToken(token)
        console.log(req.body)


        if(byUser)
        {

            var newRequest = {
                problem: problem,
                byUser: byUser,
                room: room,
                handleBy: handleBy
            };
            
            const request = new Request(newRequest);


            User.findById(byUser).then(async(user)=>{
                request.save()
                .then( async () => {
                    console.log("Add request")
                    let data = await responeData.createData(0,"","Success")
                    res.status(200).json(data)
                })
                .catch(async (err) => {
                    console.log("Err in add request")
                    let data =  await responeData.createData(1,"",err)
                    res.status(200).json(data)
                })

            }).catch(async (err)=>{
                console.log("No found")
                let data =  await responeData.createData(2,"","No Found")
                res.status(200).json(data)
        
        })
        }

    } catch (error) {
        console.log(error)
        return res.status(200).json("error")
    }

};


const getAll = async (req, res) =>{

    try {
        console.log(req.body)

        const {token} = req.body
        let id = decodeToken(token)

        if(id)
        {
            User.findById(id).populate("role", "name").then(async(user)=>{
                const {role} = user
                if(role.name === "Master")
                {
                    Request.find().populate("byUser","name")
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

                }
                else{
                    Request.find({handleBy: role}).populate("byUser","name")
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

                }


            })
        }


        
    } catch (error) {
        return res.status(400)
    }

}



const getOne = async (req, res) =>{

    try {
        Request.findById(req.params.id).populate("byUser","name")
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

const updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const {status} = req.body;

        Request.findById(id).then( async (request)=>{
            request.status = status;
            request.save().then(async () =>{ 
                let data =  await responeData.createData(0,"",process.env.SUCCESS)
                return res.status(200).json(data)
            }).catch( async (err)=>{
                // console.log(err)
                let data =  await responeData.createData(1,null,err)
                return res.status(200).json(data)})

        })
        
    } catch (error) {
        return res.status(400)
    }
}



module.exports = {create,getAll,getOne,updateRequest}