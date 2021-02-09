import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./src/customCss.css"
import Cookies from "js-cookie";
import chatService from "./service/chatService";
import { dataGet, updateState, userGetChat } from "../redux/action/message";
import YourChat from "../Common/yourChat";
import MyChat from "../Common/myChat";
import io from 'socket.io-client';
import loginServer from "../Common/service/loginServer";

function DummyPage(data){

    const {socket} = data


    // const [{ messages }, dispatch] = useReducer((state, action) => {
    //     if (action.type === 'NEW_MESSAGE') {
    //       state.items.push(action.message)
    //       return state
    //     }
    //     return state
    //   }, { messages: [] })

    const focusLast = async () => {

        var objChat = document.getElementsByClassName("chatBox")
        objChat[0].scrollTop = objChat[0].scrollHeight;

    }
    const [skip, setSkip] = useState(10)
    const [content, setContent] = useState("");
    const chatList = useSelector(state => state);
    const dispatch = useDispatch();
    const [info, setInfo] =  useState({})
    const [room, setRoom] =  useState("") 
    


    const openTheGate = (id)=>{
        socket.on(`${id}`, (data)=>{
            if(data)
            { 
                console.log(data)
                dispatch(updateState(data))
                setContent("")

            }
        })
    }

    const seenMess = async () => { 
        socket.emit("seen", {roomId: room, token: localStorage.getItem("info")})
    }





    useEffect(()=>{

        loginServer.getRole({token: localStorage.getItem('info')}).then((data)=>{
            setInfo(data.data)
            console.log(data)

            chatService.roomList({token: localStorage.getItem("info")}).then((data)=>{
                
                if(data.data.data[0])
                {
                    openTheGate(data.data.data[0]._id)
                    setRoom(data.data.data[0])
                    dispatch(userGetChat(data.data.data[0]._id ,{skip: skip}))
                    
                    
                }
                else{
                    chatService.createRoom({token: localStorage.getItem("info")}).then(async(room)=>{
                        console.log(room)
                    })
                }



            })

            socket.on('connect', () => {
                console.log(socket.id); // an alphanumeric id...
            })
        })


    }, []);


    useEffect(()=>{
        focusLast()
     }, [chatList]);

     useEffect(()=>{
         console.log(info)
        socket.on(`${info._id}`, (data)=>{
          if(data === 0){
            
            chatService.roomList({token: localStorage.getItem("info")}).then((data)=>{
                
                if(data.data.data[0])
                {
                    setRoom(data.data.data[0])
                }



            })

          }
        })
  
      }, [info])
      
      useEffect(()=>{
        console.log({room})
 
     }, [room])




    const makeMessage = () =>{
        // console.log(content.current.value)
        const data = {
            content: content,
            UserRoom: room._id,
            fromUser: localStorage.getItem("info"),
        }
        socket.emit('message', data)
    }

    // useEffect(()=>{
    //     console.log(chatList.items[0].UserRoom)
    //  }, [chatList]);

    
    return(
        <div className=" h-100">
            {/* <div className="position-absolute bottom-0 end-0">
                <div className="avatar-center avatar-status">

                <span className=" avatar-md">
                    <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
                </span>
                </div>
            </div> */}

            <div className=" position-absolute bottom-0 end-0   ">

                <div className="test border border-secondary">
                    <div className="row p-2 ">
                        <div className="col-3">
                            <span className=" avatar-md ">
                                <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
                            </span>
                            
                         </div>
                         <div className="col-9">
                         <span className="mr-3 item-text">Helper ?</span>
                         <span class="badge rounded-pill bg-success">Online</span>
                         {
                            room.lastSeenChat && room.lastSeenChat.fromUser !== info._id ? <span class="badge badge-primary">New</span> : null
                        }
                         </div>

                    </div>
                    <div className="row chatBox p3">
                    {
                    chatList.items.map((chat,idx)=>{

                        if(info._id && chat.fromUser._id !== info._id){
                            return <YourChat data={chat}/>
                        }
                        else{
                            return <MyChat data ={chat}/>
                        }

                })
            }
                    </div>
                    <div class="input-group ">
                        <input type="text" class="form-control " value={content} placeholder="Say something ..." onChange={(e)=>setContent(e.target.value)} onClick={()=>seenMess()}/>
                        <button class="btn btn-outline-secondary" type="button" onClick={makeMessage}>Send</button>
                    </div>
                    
                </div>
            </div>



        </div>

        )
}

export default DummyPage