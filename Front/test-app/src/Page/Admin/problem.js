import React, { createRef, useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import Dialog from 'react-bootstrap-dialog';
import DataTable from 'datatables.net';
import { Modal } from 'react-bootstrap';
import { useController, useForm, control  } from "react-hook-form";
import { requestGet } from '../redux/action/dataRequest';
import { useDispatch, useSelector } from 'react-redux';
import requestService from './service/requestService';
import { useHistory } from "react-router-dom";
import roomService from './service/roomService';
import loginServer from '../Common/service/loginServer';
function ProblemPanel(){

// need to get by professional
// yeah i should
// 75% function :V without test

  let history = useHistory();
  const [modal, modalState]= useState(false)
  const requestsData = useSelector(state => state)

  const [info, setInfo] = useState(0)

  const dispatch = useDispatch();

  const loadUserData = async ()=>{

    loginServer.getRole({token: localStorage.getItem('info')}).then((role)=>{
      if(role.data !== 'err')
      {
        setInfo(role.data);
      }
    }).catch((err)=>{console.log(err)});
  }



  const createTable=()=>{
      $('table.display').DataTable(
          {
              destroy: true,
            autoWidth: true,
            "lengthMenu": [
              [16, 32, 64, -1],
              [16, 32, 64, "All"]
            ]
          });
  }

  useEffect(()=>{
    console.log({info})
  },[info])

    useEffect(()=>{
        loadUserData()
        dispatch(requestGet());
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

    
    


    const handleRequest = async(request, sts, room) =>{

      if(sts === "0")
      {
        if(info._id === request.isTaken)
        {          
          console.log("Can change")
          requestService.update(request._id,{status: sts}).then(async()=>{
            dispatch(requestGet())
          })
        }
        else
        {
          alert("U cant")
        }

      }
      else{
        requestService.update(request,{status: sts}).then(async()=>{

          dispatch(requestGet())
          if(room)
          {
            roomService.attend({token: localStorage.getItem("info"), room: room}).then(async(res)=>{
              history.push(`/message/${room}`)
            })
            
          }
  
        })

      }




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
                                        request.status == 0 ?  <button type="button" class="btn btn-primary" disabled={request.status != 0 ? true : false} onClick={()=>handleRequest(request._id,"1",request.room)}>Handle request</button> :
                                        <button type="button" class="btn btn-danger" disabled = {info._id === request.status} onClick={()=>handleRequest(request,"0")}>Pending request</button>
                                      }
                                   
                                    </td>
                                    <td>
                                      {
                                        request.status == 2 ? null :  <button type="button" class="btn btn-success">Mark success</button>
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