import React, { createRef, useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import Dialog from 'react-bootstrap-dialog';
import reqHandle from "../redux/reducer/requestHandler";
import { applyMiddleware, createStore } from "redux";
import { Modal } from 'react-bootstrap';
import { useController, useForm, control  } from "react-hook-form";
import { updateState } from "../redux/action/dataRequest";
import { requestGet } from '../redux/action/dataRequest';
import { useDispatch, useSelector } from 'react-redux';
import requestService from './service/requestService';
import { useHistory } from "react-router-dom";
import roomService from './service/roomService';
import loginServer from '../Common/service/loginServer';
import thunk from 'redux-thunk';
import { getList } from '../redux/action/data';
function ProblemPanel(props){

// need socket :V

const {socket}=props

let store = createStore(reqHandle,applyMiddleware(thunk))
store.subscribe(()=>setList(store.getState()))

  let history = useHistory();
  const [modal, modalState]= useState(false)
  const [requestsData, setList] = useState({loading: true})

  

  const [info, setInfo] = useState(0)
  const loadUserData = async ()=>{

    loginServer.getRole({token: localStorage.getItem('info')}).then((role)=>{
      if(role.data !== 'err')
      {
        setInfo(role.data);
      }
    }).catch((err)=>{console.log(err)});
  }


  socket.on("Request", data =>{
    store.dispatch(updateState(data))

  })
  const createTable=()=>{
      $('table.display').DataTable(
          {
              destroy: true,
            autoWidth: true,
            "lengthMenu": [
              [6, 12, 24, -1],
              [6, 12, 24, "All"]
            ]
          });
  }

  useEffect(()=>{
    console.log({info})
  },[info])

  useEffect(()=>{
    console.log({requestsData})
  },[requestsData])

    useEffect(()=>{
        loadUserData()
        store.dispatch(requestGet())
        createTable()
    },[])



    useEffect(()=>{
      if(!requestsData.loading)
      {

        createTable()
      }
    },[requestsData.loading])

    const data ={
      name: "L"
    }

    const renderSwitch = (param) => {
      switch (param){
        case "0" : return <span class="badge bg-danger">Pending ...</span>
        case "1" : return <span class="badge bg-primary">Busy ...</span>
        default : return  <span class="badge bg-dark">Closed</span>
      }
    }

    const renderButton = (request) => {
      switch (request.status){
        case "0" : return <button type="button" class="btn btn-primary" disabled={request.status != 0 ? true : false} onClick={()=>handleRequest(request._id,"1",request.room)}>Handle request</button>
        case "1" : return <button type="button" class="btn btn-danger" disabled = {info._id === request.status} onClick={()=>handleRequest(request,"0")}>Pending request</button>
        default : return  null
      }
    }

    
    


    const handleRequest = async(request, sts, room) =>{

      if(sts === "0")
      {
        // only who was taken can change the status because why ... 
        if(info._id == request.isTaken)
        {          
          console.log("Can change")
          requestService.update(request._id,{status: sts,token: localStorage.getItem("info")}).then(async()=>{
            store.dispatch(requestGet())
          })
        }
        else
        {
          alert("U cant")
        }

      }
      else{
        requestService.update(request,{status: sts, token: localStorage.getItem("info")}).then(async()=>{

          store.dispatch(requestGet())
          if(room)
          {
            roomService.attend({token: localStorage.getItem("info"), room: room}).then(async(res)=>{
              // if "he" doesnt in the room, add him, if he already ? why bother
              history.push(`/message/${room}`)
            })
            
          }
  
        })

      }
    }

    const doneRequest = async(id) =>{

      requestService.update(id,{status: "3",token: localStorage.getItem("info")}).then(async()=>{
        store.dispatch(requestGet())
      })

    }
    



    return(

    <div className="row justify-content-center">
        <div className="col-12">
        <div className="row mb-4 items-align-center">
        <h2 className="mb-2 page-title">Problem's request</h2>
          <div className="col-md-auto ml-auto text-right">
            <button type="button" className="btn" onClick={()=>modalState(!modal)}><span className="fe fe-plus fe-24 text-muted text-primary" ></span></button>
          </div>
        </div>
        <div className="row my-4">

          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-body">
                {requestsData && requestsData.loading === true ? <div>Loading ...</div>:
                              <table className="table datatables display ">
                              <thead>
                              <tr>
                                  <th>#</th>
                                  <th>Prolem</th>
                                  <th>Status</th>
                                  <th>User</th>
                                  <th>Action</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  requestsData.items.map((request,idx)=>{
                                    return (
                                    <tr key={idx}>
                                    <td>{request._id}</td>
                                    <td>{request.problem}</td>
                                    <td>{ renderSwitch(request.status)
                                    }</td>
                                    <td>{request.byUser && request.byUser.name}</td>
                                    <td>
                                      {
                                        renderButton(request)
                                        
                                      }
                                   
                                    </td>
                                    <td>
                                      {
                                        request.isTaken == info._id  ?   <button type="button" class="btn btn-success" onClick={()=>doneRequest(request._id)}>Mark success</button> : null
                                      }
                                    </td>
                                    </tr>
                                    )
                                  })
                                }
              
                              </tbody>
                            </table> }
              </div>
            </div>
          </div> 
          </div> 

    {/*  */}
    <Modal
    size="lg"
    show={modal}
    onHide={()=>modalState(!modal)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Blah blah
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <UserDetail type={true} data={data}/>
    
    </Modal.Body >
  </Modal>

</div>

    </div>)

}


function UserDetail(data) {

  const [disable, disableChange] = useState(true)


  const name = useRef("")
  const email = useRef("")
  const role = useRef("")



  useEffect(()=>{
    console.log("props data:", data.data);

  },[])


  const onSubmit = (e) =>{

    const value = {
      name: name.current.value,
      email: email.current.value,
      role: role.current.value
    }
    console.log(value)
    e.preventDefault();
  }

  const submitForm=(id) =>{
    // const data={

    // }
    
    // console.log(data)
    // if(this.state.isEdit)
    // {

      
    // }
    // else
    // {


    // }
  }


        return ( 
        <form onSubmit={onSubmit}>
          <fieldset disabled={false}>

          <div class="mb-3">
            <label class="form-label">name</label>
            <input ref={name} defaultValue={data.data.name} class="form-control"/>
          </div>

          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input ref={email} defaultValue={data.data.email} class="form-control"/>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
          </fieldset>
        </form> );
    
}

export default ProblemPanel;