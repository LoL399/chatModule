import userServie from '../service/userService'

let getInfo = () =>

    userServie.info().then((info)=>{
        const{data} = info
        console.log(data.data)
        return {info: data.data[0]}
    })

export default { getInfo }