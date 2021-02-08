let Role = require("../models/roles")
let responeData = require("./responeData") 

const create = async (req, res) => {
    try {
        const { name } = req.body;
        var newRole = {
            name: name,
        };

        const role = new Role(newRole);
        role.save()
        .then( async () => {
            console.log("Add user")
            let data = await responeData.createData(0,"","Success")
            return res.status(200).json(data)
        })
        .catch(async (err) => {
            console.log("Err in add user")
            let data =  await responeData.createData(1,"",err)
            return res.status(200).json(data)
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json("error")
    }

};

const getAll = async (req, res) =>{

    try {
        Role.find()
        .then( async (roles)=>{
            // console.log(roles)
            let data =  await responeData.createData(0,roles, process.env.SUCCESS)
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


module.exports = {create,getAll}