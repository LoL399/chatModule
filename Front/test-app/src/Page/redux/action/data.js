import chatService from "../../Admin/service/chatService";
import roomService from "../../Admin/service/roomService";
import userService from "../../Admin/service/userService"
export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export function dataGet(){

    return function(dispatch)
    {
        return userService.list().then(data =>{
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

// export function bindComments(postId) {
//     return function(dispatch) {
//         return API.fetchComments(postId).then(comments => {
//             // dispatch
//             dispatch({
//                 type: BIND_COMMENTS,
//                 comments,
//                 postId
//             });
//         });
//     };
// }

// const dataUpdate = () => {
//     return{type: "Add"}
// }
// export {dataGet,dataUpdate}

export const getList = (data) => async(dispatch) => {


    try{
        const res = await roomService.list(data)
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: res.data.data
            })
    }
    catch(e){
        dispatch( {
            type: FETCH_USERS_FAILURE,
            payload: console.log(e),
        })
    }
    // return function(dispatch)
    // {
    //     return roomService.list().then(data =>{
    //         dispatch({
    //             type: FETCH_USERS_SUCCESS,
    //             payload: data.data.data
    //         })
            
    //     }).catch(()=>{
    //         dispatch({
    //             type: FETCH_USERS_FAILURE
    //         })

    //     })
        
    // return{type: FETCH_USERS_BEGIN, payload: await userService.list()}
}
