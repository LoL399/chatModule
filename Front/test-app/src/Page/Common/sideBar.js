import { useEffect, useState } from "react"
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import loginServer from "./service/loginServer";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { dataGet, getList } from "../redux/action/data";
import { applyMiddleware, createStore } from "redux";
import userHandler from "../redux/reducer/dataHandler";
import thunk from "redux-thunk";



function SideBar(props){

  const {socket } = props

    const [collapse, setCollapse] = useState(props.collapsed)
    const [id, setID] = useState()
    const [wait, setWait] = useState([])
    const [list, setList] = useState({loading: true})
    const history = useHistory();
    const [role, setRole] = useState({})
    const [newChat,setNewChat] = useState([])
    let location = useLocation();

    // const list = useSelector(state => state)
    // const dispatch = useDispatch();
    // window.addEventListener("beforeunload", (ev) => 
    // {  
    //     ev.preventDefault();
        
    //     if(parseInt(localStorage.getItem("instance"))>0)
    //     {
    //         let count = parseInt(localStorage.getItem("instance"))
    //         console.log(count)
    //         localStorage.setItem("instance", count - 1)
    //         if(count-1 < 1)
    //         {
    //             socket.emit("offline",role._id)

    //         }
    //     }
    //     else
    //     {
    //       localStorage.setItem("instance", 0)
          
    //     }
    //     return ev.returnValue = 'Are you sure you want to close?';
    // });

    let store = createStore(userHandler,applyMiddleware(thunk))
    store.subscribe(()=>setList(store.getState()))


    const roleSet = async() =>{
      if(localStorage.getItem('info'))
      {
        loginServer.getRole({token: localStorage.getItem('info')}).then((role)=>{
          if(role.data !== 'err')
          {
            setRole(role.data);
            if(parseInt(localStorage.getItem("instance"))==1)
              socket.emit('online', role.data._id)
          }
        });
      }
    }



    useEffect(()=>{

      // if(id){
      //     dispatch(getByRoom(id,15))

      // }
      // else
      // {
      //     chatService.getRoomList().then((data)=>{
      //         if(data.data.data[0])
      //         {
      //             history.push(`/message/${data.data.data[0]._id}`)
      //         }
      //         else
      //         {
      //             history.push(`/welcome`)
      //         }
      //     })
      // }
      console.log(location.pathname)

  }, [location]);


    


    useEffect(async() => {
      let count = parseInt(localStorage.getItem("instance"))
      if(count)
      {
        count +=1
          localStorage.setItem("instance", count + 1)
          
      }
      else
          localStorage.setItem("instance",  1)   
      console.log("Hello",id)
      await roleSet()
      store.dispatch(getList({token: localStorage.getItem('info')}))
      openTheGate()

      return () => {
        count -= 1
        localStorage.setItem("instance",  count) 
        console.log({count})
      }
  


      // else
      // {
      //   history.push("/welcome")
      // }

    }, []);


    useEffect(()=>{
      console.log(role)
      socket.on(`${role._id}`, (data)=>{
        console.log("Hhahahah")
        if(data === 0){
          store.dispatch(getList({token: localStorage.getItem('info')}))
        }
      })

    }, [role])

    const openTheGate = ()=>{
      socket.on(`PushUp`, (data)=>{
        console.log(data)
          if(data)
          { 
            if(!wait.includes(data))
            {
              console.log(data)
              setWait(oldState =>[...oldState, data])
            }
              // dispatch(updateState(data))
              // setContent("")

          }
    })
    }



  


  useEffect(() => {
    console.log(list)
  }, [list]);


    
    useEffect(() => {
        setCollapse(props.collapsed); console.log(props.collapsed)
      }, [props]);

    return (

        <nav className="vertnav navbar navbar-light">
        <ul className="navbar-nav flex-fill w-100 mb-2">

          {role.role && role.role.name === "Master" ?         
          <li className="nav-item ">
            <Link  className=" nav-link" to={"/admin"}>
              <i className="fe fe-home fe-16"></i>
              <span className="ml-3 item-text">DASHBOARD</span><span className="sr-only">(current)</span>
            </Link>

          </li> : null
          }
          {
            role !== "user" ?
            <li className="nav-item  ">
              <Link  className=" nav-link" to={"/request"}>

              <i className="fe fe-home fe-16"></i>
              <span className="ml-3 item-text">REQUESTS</span><span className="sr-only">(current)</span>

            </Link>

          </li> : null
          }


        

        </ul>
          

        {
            collapse === true ? null :        
             <form class="form-inline mr-auto searchform text-muted">
            <input class="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted" type="search" placeholder="Search chat..." aria-label="Search"/>
          </form>
        }
        {
          list.loading === true ? null :
          <ul className="navbar-nav flex-fill w-100 mb-2">
          {
            list.items.map((user,idx)=>{
              return (


                           
                <Link className={ location.pathname == `/message/${user._id}` ? "nav-item mt-2 active" : "nav-item mt-2 "} to={`/message/${user._id}`  } >
                {collapse ? 
                <span className=" avatar-sm">
                <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
    
              </span>
                : 
                <span className=" avatar-md">
                <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
                  {
                      user.attendants.map((att,idx)=>{
                        return (
                          <span className="ml-3 item-text">
                          
                          {att.name}
                          </span>

                        )
                      })
                  }
                {
                  user.lastSeenChat && user.lastSeenChat.fromUser !== role._id ? <span class="badge badge-primary">New</span> : null
                }
                {/* {newChat.includes(user._id) === true ? <span class="badge badge-primary">New</span> : null } */}
                
                {/* {
                  wait.includes(user.UserRoom) === true ? <span className="ml-3 item-text">New</span> : null
                } */}
              </span>}
              </Link>


              )



            })
          }
        </ul>
        }
        


      </nav>
      )
}



export default SideBar