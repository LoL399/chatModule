let User = require("../models/users")
let responeData = require("./responeData") 

const create = async (req, res) => {
    try {
        const { email, name, role } = req.body;
        var newUser = {
            name: name,
            email: email,
            role: role
        };
        const user = new User(newUser);
        user.save()
        .then( async () => {
            console.log("Add user")
            let data = await responeData.createData(0,"",process.env.SUCCESS)
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
        User.find().populate("role","name")
        .then( async (users)=>{
            // console.log(roles)
            let data =  await responeData.createData(0,users, process.env.SUCCESS)
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
        User.findById(req.params.id).populate("role","name")
        .then( async (users)=>{
            // console.log(roles)
            let data =  await responeData.createData(0,users, process.env.SUCCESS)
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



module.exports = {create,getAll,getOne}