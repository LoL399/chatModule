import { connect, createStoreHook } from 'react-redux'
import {createStore} from 'redux'


// const Counter = ...

//Store

//Action

const message = () =>{
  return {
    type: "Hello"
  }

}


//Reducer

const messenger = (state ="", action) => {
  switch(action.type){
    case "Hello": return 1
    default: return 0
  }

}
let store = createStore(messenger)


//Dispatch

export default connect(messenger)