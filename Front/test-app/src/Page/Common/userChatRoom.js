import { useEffect, useRef, useState } from "react"
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { getByRoom, updateState } from "../redux/action/message";
import { useHistory, useParams } from "react-router-dom";
import MyChat from "./myChat";
import YourChat from "./yourChat";
import Cookies from "js-cookie";
import io from 'socket.io-client';
import chatService from "../Admin/service/chatService";
import loginServer from "./service/loginServer";
import userService from "../Admin/service/userService";


// const socket = io('localhost:8080');


function UserChat(props){

    const {socket} = props

    const history = useHistory()
    const [role, setRole] = useState("user")

    const focusLast = async () => {

        var objChat = document.getElementsByClassName("chatArea")
        objChat[0].scrollTop = objChat[0].scrollHeight;

    }

    
    const [content, setContent] = useState("");
    var   {  id } = useParams();
    const chatList = useSelector(state => state);
    const [info,setInfo] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {

        loginServer.getRole({token: localStorage.getItem('info')}).then((role)=>{
          if(role.data !== 'err')
          {
            setRole(role.data);
            openTheGate()
          }
        }).catch((err)=>{console.log(err)});
  
      }, []);


    useEffect(()=>{
        if(id){
            dispatch(getByRoom(id,15))
            socket.on('connect', () => {
                console.log(socket.id); // an alphanumeric id...
             });
        }
        else
        {
            // chatService.getRoomList().then((data)=>{
            //     if(data.data.data[0])
            //     {
            //         history.push(`/message/${data.data.data[0]._id}`)
            //     }
            //     else
            //     {
            //         history.push(`/welcome`)
            //     }
            // })
        }
        console.log("Role",role)

    }, [role]);


    useEffect(()=>{ 
        if(!chatList.loading && chatList.items[0].UserRoom)
        {
            chatList.items[0].UserRoom.attendants.map((att,idx)=>{
                if(att!==role._id)
                {
                    userService.getById(att).then((user)=>{
                        setInfo(user.data.data)
                    })
                }
    
            })
        }  

        focusLast();
    },[chatList])




    const openTheGate = ()=>{
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
        socket.emit("seen", {roomId: id, token: localStorage.getItem("info")})
    }



    const makeMessage = () =>{
        // console.log(content.current.value)
        const data = {
            content: content,
            UserRoom: id,
            fromUser: localStorage.getItem("info")
        }
        socket.emit('message', data)
    }

    return (
        <div className="container">

            <div className="row p-3 border-bottom">
                <div className="col-6">
                <span className=" avatar-md ">
                    <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
                </span>
                {info === 0 ? "Loading" : <span className="ml-3 mr-3 item-text">{info.name}</span> }

                <div className="form-check-inline p-2"> 
                <span class="badge bg-primary">{info === 0  ? "Loading" : info.role.name }</span>
                {/* <span class="badge rounded-pill bg-success">Online</span>
                <span class="badge rounded-pill bg-danger">Offline</span> */}
                </div>


                </div>
                <div className="col-6">
                    <div class="dropdown float-right">
                        <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown link
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>

                </div>

            </div>

            <div className="row chatArea p3">
            {
                chatList.items.map((chat,idx)=>{

                    if(role._id && chat.fromUser !== role._id){
                        return <YourChat data={chat}/>
                    }
                    else{
                        return <MyChat data ={chat}/>
                    }

                })
            }
    {/* seen ?
            <div className="col-12">

                <span className=" avatar-sm float-right">
                    <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
                </span>
            </div>
             */}
            

            </div>
            <div class="input-group mb-3 mt-2 position-sticky ">
                <input type="text" class="form-control" placeholder="Say something ..." value={content} onClick={()=>seenMess()} onChange={(e)=>setContent(e.target.value)}/>
                <button class="btn btn-outline-secondary" type="button" onClick={makeMessage}>Send</button>
            </div>
        
        </div>

    )
}



export default UserChat
