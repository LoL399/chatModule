const createData = async (errCode, data, message) =>{
    return {
        err: errCode,
        data: data,
        message: message
    }
}

module.exports = {createData}