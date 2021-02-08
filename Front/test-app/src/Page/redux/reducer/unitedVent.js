import { combineReducers } from "redux";
import userHandler from "./dataHandler";
import messenger from './messageHandler'
const allUnite = combineReducers({
    mess: messenger,
    data: userHandler
})  

export default allUnite