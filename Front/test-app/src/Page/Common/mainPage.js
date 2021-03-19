import AdminPage from "../Admin/adminPage";
import { BrowserRouter, Route, Link, Switch, Redirect, Router } from "react-router-dom";

import "./src/css/simplebar.css"
import "./src/css/dataTables.bootstrap4.css"
import "./src/css/feather.css"
import "./src/css/select2.css"
import "./src/css/dropzone.css"
import "./src/css/uppy.min.css"
import "./src/css/jquery.steps.css"
import "./src/css/jquery.timepicker.css"
import "./src/css/quill.snow.css"
import "./src/css/daterangepicker.css"
import "./src/css/app-light.css";
import "./src/css/costumecss.css"; 
import sideBar from "./sideBar";
import { useEffect, useState } from "react";
import SideBar from "./sideBar";
import ProblemPanel from "../Admin/problem";
// import ProblemForm from "../User/problemForm";
import UserChat from "./userChatRoom";
import DummyPage from "../User/dummyPage";

// let instance = 0
function MainPage(props){

    const {socket} = props
    const [collapsed, setCollapse] = useState(false)


    return(
        <div className={collapsed === false ? "vertical light" : "vertical light collapsed" }>
                <div className="wrapper">
                <nav className="topnav navbar navbar-light">
            <button type="button" className="navbar-toggler text-muted mt-2 p-0 mr-3" onClick={()=> setCollapse(!collapsed)}>
            <i className="fe fe-menu navbar-toggler-icon"  ></i>
            </button>
            <ul className="nav">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="avatar avatar-sm mt-2">
                    <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
                </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" >Log Out</a>
                </div>
            </li>
            </ul>
            </nav>
            <aside className="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>

            <SideBar collapsed={collapsed}  socket={socket}/>
            </aside>


            <main role="main" className="main-content">
            <div className="container-fluid ">

            <Switch>
                <Route path='/message/:id' exact render={props => (<UserChat socket={socket} />)} />
                {/* <Route path='/message' exact render={props => (<UserChat socket={socket} />)}  /> */}
                <Route path='/request' exact  render={props => (<ProblemPanel socket={socket} />)} />
                {/* <Route path='/report' exact component={ProblemForm} /> */}
                <Route path='/admin' exact component={AdminPage} />

                <Redirect to='/welcome'/>
            {/* Private Route soon */}
            </Switch>
                     
                    </div>
                    </main>
                </div>

            </div> 
        // <div>

        // </div>
    )

}

export default MainPage