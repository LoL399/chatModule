let Request = require("../models/requests")
let User = require("../models/users")
let responeData = require("./responeData") 

const create = async (req, res) => {
    try {
        const { problem, byUser } = req.body;

        var newRequest = {
            problem: problem,
            byUser: byUser
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
    } catch (error) {
        console.log(error)
        return res.status(200).json("error")
    }

};


const getAll = async (req, res) =>{

    try {
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
        const {status, problem, handleBy} = req.body;

        Request.findById(id).then( async (request)=>{
            request.status = status;
            request.problem = problem;
            request.handleBy = handleBy;
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