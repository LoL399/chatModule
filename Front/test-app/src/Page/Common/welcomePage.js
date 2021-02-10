import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dataGet } from '../redux/action/data';
import '../src/customCss.css'
import loginServer from './service/loginServer';
import Cookies from "js-cookie";
function WelcomePage(){

  const [modal, modalState]= useState(false)

  const history = useHistory()

  const userData = useSelector(state => state)


  const dispatch = useDispatch();

  const asyncLocalStorage = {
    setItem: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
        await null;
        return localStorage.getItem(key);
    },
    removeItem: async function (key) {
      await null;
      return localStorage.removeItem(key);
  }
};

  const loginHandler = user =>{
    

    const data = {
      id:user._id
    }

    loginServer.login(data).then( async (token) => {
      // console.log(token.data)
      if(token)
      {
        await asyncLocalStorage.setItem('info', token.data.data);
        if(user.role.name==="user")
        {
          return history.push("/dummy");
        }
        return history.push("/admin");

        // Cookies.set("info",token.data.data,{expires:1}); 

      }
    })
  }

  

  
  useEffect(async ()=>{
    await asyncLocalStorage.removeItem('info');
    dispatch(dataGet());
    console.log(userData); 

},[])


return (
  <div className=" h-100">
    
    {userData.loading === true ? <div>Loading ...</div>:
        <section class="card2-list h-100">
          {userData.items.map((user,idx)=>{
            return (
              <article class="card2" onClick={()=>loginHandler(user)}>
              <header class="card2-header">
                <p>Testing subject</p>
              </header>
      
              <div class="card2-author">
                <a class="author-avatar" href="#">
                  <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} />
                </a>
                <svg class="half-circle" viewBox="0 0 106 57">
                  <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>
      
                <div class="author-name">
                  <p className="text-ligh">{user.name}</p>
                </div>
              </div>
              <div class="tags">
                <a href="#">{user.role?.name}</a>
              </div>
            </article>
            )
          })}
          </section>

      }
  </div>

      







);
}
export default WelcomePage