let User = require("../models/users")
let responeData = require("./responeData") 
var jwt = require('jsonwebtoken');
const { populate } = require("../models/users");

const createToken = async (role, roleName, id) =>{
  let token = await jwt.sign({ id: id, role: roleName }, process.env.TOKEN_SECRET_TECH)
  return token;
}



const verifyToken = (token) =>{
  jwt.verify(token, process.env.TOKEN_SECRET_TECH,(err,data)=>{
        if (err) {
          return -1
        }
  })
}

const decodeToken = (token) =>{
  return jwt.decode(token).id
}

const getRole = async (req,res) =>{
  const {token} = req.body
  if(token)
  {
      User.findById(decodeToken(token)).populate("role","name").then((user)=>{
        if(user)
        {
          return res.status(200).json(user)
        }

        return res.status(200).json("err")
      }
        
      )
  }
}


const getID = async (req,res) =>{
  
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1]

  const id = await decodeToken(token)
  if(id)
  {
      User.findById(id).populate("role","name").then((user)=>{
        if(user)
        {
          return res.status(200).json({id: id})
        }
        return res.status(200).json({id: -1})
      }
        
      )
  }
}





const login = async (req, res) => {
    const { id } = req.body;

    console.log(id)
    User.findById(id).then( async (user) => {
      // console.log(data);
      if(user)
      {
        console.log("Login time")
        let data = await responeData.createData(0, jwt.sign({ id: id }, process.env.TOKEN_SECRET_TECH), process.env.SUCCESS)
        return res.status(200).json(data)
      }
  
        // if(data.password === req.body.password )
        //   if(data.status)
        //   {
        //     returnData={
        //       name: data.name,
        //       photo: data.photo,
        //       id: data._id,
              
        //     }
        //     return res.json({ data: returnData, token:  jwt.sign({ data: data._id }, process.env.TOKEN_SECRET_ADMIN)});
  
        //   }
        //   else
        //   {
        //     console.log("not active");
        //     return res.status(200).json({err:403});
        //   }
  

  
  
    }
      
  
    ).catch(err => console.log(err))
  
    // if (email != "admin" || password != "admin") {
    //   return res.status(400).json("err, Hack?? 😣");
    // }
    // return res.json("Ok go forward");
  };

  module.exports ={ login,decodeToken,getRole, getID }