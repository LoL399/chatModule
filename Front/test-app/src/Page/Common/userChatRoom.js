import { useEffect, useRef, useState } from "react"
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { destroy, getByRoom, getMoreChat, updateState } from "../redux/action/message";
import { useHistory, useParams } from "react-router-dom";
import MyChat from "./myChat";
import YourChat from "./yourChat";
import Cookies from "js-cookie";
import io from 'socket.io-client';
import chatService from "../Admin/service/chatService";
import loginServer from "./service/loginServer";
import userService from "../Admin/service/userService";
import { Button, Modal } from "react-bootstrap";
import ProblemForm from "../Admin/problemForm"
import roomService from "../Admin/service/roomService";

// const socket = io('localhost:8080');


function UserChat(props){
    // all user name in one tag :V stupid

    const {socket} = props

    const history = useHistory()
    const [role, setRole] = useState("user")

    const [modal, setModal] = useState(false)

    const [content, setContent] = useState("");
    var   {  id } = useParams();
    const chatList = useSelector(state => state);
    const [info,setInfo] = useState([])
    const [page, setPage] = useState(1)
    const [allow,setAllow] = useState(false)

    const dispatch = useDispatch();

    const focusLast = async () => {

        var objChat = document.getElementsByClassName("chatArea")
        objChat[0].scrollTop = objChat[0].scrollHeight;

    }

    const getList = () =>{
        roomService.getAttendantList({id: id}).then(async(users)=>{
            setInfo(users.data.data)
        })
    }

    const initData = () =>{
        loginServer.getRole({token: localStorage.getItem('info')}).then((role)=>{
            if(role.data !== 'err')
            {
              setRole(role.data);
              openTheGate()

            }
          }).catch((err)=>{console.log(err)});
    }

    useEffect(() => {


        getList()
        focusLast();
        

      }, []);
      useEffect(() => {
        dispatch(destroy())
        setPage(1)
        focusLast();
        initData()
      }, [id]);

    useEffect(()=>{
        if(id){

            dispatch(getByRoom(id, 15*page))

            // socket.on('connect', () => {
            //     console.log(socket.id); // an alphanumeric id...
            //  });
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

    useEffect(async ()=>{
        let a= await search(role._id, info)
        setAllow(a)
    },[info,role])


    useEffect(()=>{ 
        dispatch(destroy())
        dispatch(getByRoom(id, 15*page))

    },[page])

    

    useEffect(()=>{ 
        console.log(info)
    },[info])



    const GTFO = async () => {
        roomService.GTFO({token: localStorage.getItem("info"), roomId: id}).then(async (room)=>{
            if(room.data.message===1)
            {
                history.push(`/request`)

            }
        })
    }

    const moreChat = async () =>{
        setPage(page+1)
    }





    const openTheGate = ()=>{
        socket.on(`${id}`, (data)=>{
            console.log({data})
            if(data)
            { 
                console.log({data})
                dispatch(updateState(data))
                setContent("")
            }
        })
    }

    const seenMess = async () => { 
        socket.emit("seen", {roomId: id, token: localStorage.getItem("info")})
    }

    const search = async (nameKey, myArray) =>{
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i]._id == nameKey) {
                console.log("Yes")
                return true;
            }
        }
        return false
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
                <div className="form-check-inline p-2"> 
                {info.map( ( user, idx)=>{

                    return (
                        <span className="ml-2 item-text">{user.name}</span>
                        
                    )
                    
                })}
                </div>




                </div>
                <div className="col-6">
                    <div className="dropdown float-right p-2">
                        {/* create new user problem request  */}
                        <button type="button" className="btn btn-primary" onClick={()=>{setModal(true)}}>Create Problem </button>
                        {/* GTFO */}
                        <button type="button" class="btn btn-danger ml-2" onClick={()=>{GTFO()}}>GTFOUT</button>
                    </div>

                </div>

            </div>

            <div className="row chatArea p3">
                {chatList.err==-1?<small className="text-center mt-2" onClick={()=>moreChat()}>You've reached the beginning of the chat box</small>:<p className="text-center mt-2" onClick={()=>moreChat()}>Load more ...</p>}
            {
                chatList.items.map((chat,idx)=>{
                    
                    if(chat.fromUser?._id !== role._id){
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
            {
               allow === true  ? 
                <div class="input-group mb-3 mt-2 position-sticky ">
                    <input type="text" class="form-control" placeholder="Say something ..." value={content} onClick={()=>seenMess()} onChange={(e)=>setContent(e.target.value)}/>
                    <button class="btn btn-outline-secondary" type="button" onClick={makeMessage}>Send</button>
                </div> : null
            }









            <Modal show={modal} size="lg" onHide={()=>setModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProblemForm info = {info} room={id} socket={socket}/>
                </Modal.Body>
            </Modal>
        
        </div>

    )
}



export default UserChat
