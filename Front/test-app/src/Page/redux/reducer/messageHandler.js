
import { FETCH_USERS_BEGIN, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from "../action/message";



// const addData = async ( data ) =>{
//     userService.update(data).then(()=>fetchData())
//  }
 
const initialState = {
    items: [],
    loading: true,
    error: null
  };
  
  export default function messageReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_USERS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_USERS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          loading: false,
          items: action.payload,
          err: action.err
        };
  
      case FETCH_USERS_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have items to display anymore, so set `items` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the items around!
        // Do whatever seems right for your use case.
        return {
          ...state,
          loading: false,
          error: action.payload,
          items: []
        };

        case "NEW_CHAT":
          return {
            loading: false,
            error: null,
            items: state.items.concat(action.payload)
          };
          
        case "MORE_CHAT":
          let oldState =  state.items
          console.log({oldState})
          return {
            loading: false,
            error: null,
            items: action.payload.concat( oldState )
          };
        
        case "DESTROY_SESSION":
          state = initialState
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
}