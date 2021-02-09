import requestService from "../../Admin/service/requestService";

export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export function requestGet(){

    return function(dispatch)
    {
        return requestService.list({token: localStorage.getItem("info")}).then(data =>{
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