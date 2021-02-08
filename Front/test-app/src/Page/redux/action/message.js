import chatService from "../../Admin/service/chatService";
import userChatService from "../../User/service/chatService";



export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';



export function dataGet(){

    return function(dispatch)
    {
        return chatService.list().then(data =>{
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: data.data.data
            })
            
        }).catch(()=>{
            dispatch({
                type: FETCH_USERS_FAILURE
            })

        })
        
    }
    // return{type: FETCH_USERS_BEGIN, payload: await userService.list()}
}

export function updateState(newItem){

        return({
                type:"NEW_CHAT",
                payload: newItem })

    // return{type: FETCH_USERS_BEGIN, payload: await userService.list()}
}

export function userGetChat(id,data){

    return function(dispatch)
    {
        return userChatService.list(id,data).then(chat =>{
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: chat.data.data
            })
            
        }).catch(()=>{
            dispatch({
                type: FETCH_USERS_FAILURE
            })

        })
        
    }
    // return{type: FETCH_USERS_BEGIN, payload: await userService.list()}
}


export function getByRoom(id,skip){

    return function(dispatch)
    {
        return chatService.getRoom(id,{skip:skip}).then(data =>{
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: data.data.data
            })
            
        }).catch(()=>{
            dispatch({
                type: FETCH_USERS_FAILURE
            })

        })
        
    }
    // return{type: FETCH_USERS_BEGIN, payload: await userService.list()}
}

export function getList(id){

    return function(dispatch)
    {
        return chatService.getRoomList().then(data =>{
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: data.data.data
            })
            
        }).catch(()=>{
            dispatch({
                type: FETCH_USERS_FAILURE
            })

        })
        
    }
    // return{type: FETCH_USERS_BEGIN, payload: await userService.list()}
}






