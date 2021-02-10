let Request = require("../database/models/requests")
let User = require("../database/models/users")
const { decodeToken } = require("../database/controllers/loginHandler");
const create = async (data,io) => {
    try {
        const { problem, token,room, handleBy } = data;
        const byUser = decodeToken(token)
        if(byUser)
        {

            User.findById(byUser).then(async(user)=>{
                
                var newRequest = {
                    problem: problem,
                    byUser: byUser,
                    room: room,
                    handleBy: handleBy
                };
                
                const request = new Request(newRequest);
                request.save()
                .then( async () => {
                    console.log("Add request")
                    io.emit(`Request`, request)
                })
                .catch(async (error) => {
                    console.log(error)

                })

            }).catch(async (error)=>{

                console.log(error)
        
        })
        }

    } catch (error) {
        console.log(error)

    }

};


module.exports = {create}