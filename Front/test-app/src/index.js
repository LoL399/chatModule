import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import messenger from './Page/redux/reducer/messageHandler';
import allUnite from './Page/redux/reducer/unitedVent';
import thunk from 'redux-thunk';

//Store

//Action

//Reducer
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


let store = createStore(messenger,applyMiddleware(thunk))
store.subscribe(()=> console.log(store.getState()))




ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>

      <App />

  </Provider>
  </BrowserRouter>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

