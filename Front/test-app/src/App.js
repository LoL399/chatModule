import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import {  Route, Link, Switch, Redirect, Router as BrowserRouter} from "react-router-dom";
import welcomePage from './Page/Common/welcomePage';
import { useDispatch, useSelector } from 'react-redux';
import {messageGet} from "./Page/redux/action/message"
import AdminPage from './Page/Admin/adminPage';
import MainPage from './Page/Common/mainPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import DummyPage from './Page/User/dummyPage';
import { io } from 'socket.io-client';
const socket = io('localhost:8080');

function App() {

  


  // const message = useSelector(state => state.mess)
  // const dispatch = useDispatch()

  



  // const[count, useCount]=useState(0)

  // socket.on('message', (data)=>{
  //   console.log(data)
  // })

  // const onClick = () =>{
  //   socket.emit('message', 'hello')

  // }
  return (

          <Switch>
            {/* <Route path='/' exact component={}/> */}
            {/* <Route path='/admin' component={AdminPage}/> */}
                <Route path='/welcome' exact component={welcomePage} />
                <Route path='/dummy' exact render={props => (<DummyPage socket={socket} />)}/>
                <Route path='/' render={props => (<MainPage socket={socket} />)} />

                <Redirect to='/welcome'/>
            {/* Private Route soon */}
        </Switch>




  );
}

export default App;
