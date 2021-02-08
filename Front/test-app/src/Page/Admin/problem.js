import React, { createRef, useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import Dialog from 'react-bootstrap-dialog';
import DataTable from 'datatables.net';
import { Modal } from 'react-bootstrap';
import { useController, useForm, control  } from "react-hook-form";
import { requestGet } from '../redux/action/dataRequest';
import { useDispatch, useSelector } from 'react-redux';

function ProblemPanel(){


  const [modal, modalState]= useState(false)
  const requestsData = useSelector(state => state.data)
  const dispatch = useDispatch();
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
                {requestsData.loading === true ? <div>Loading ...</div>:
                              <table className="table datatables display ">
                              <thead>
                              <tr>
                                  <th>#</th>
                                  <th>Prolem</th>
                                  <th>Status</th>
                                  <th>User</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  requestsData.items.map((request,idx)=>{
                                    return (
                                    <tr key={idx}>
                                    <td>{request._id}</td>
                                    <td>{request.problem}</td>
                                    <td>{async ()=>{
                                      switch (request.status){
                                        case "0" : return <span class="badge bg-danger">Pending ...</span>
                                        case "1" : return <span class="badge bg-primary">Handling ...</span>
                                        default : return  <span class="badge bg-dark">Closed</span>
                                      }
                                    }}</td>
                                    <td>{request.byUser.name}</td>
                                      <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          <span className="text-muted sr-only">Action</span>
                                        </button>
                                        {/* <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState(0, true,user)}>Edit</a>
                                          <a className="dropdown-item text-danger pointercursor" onClick={()=>this.removeConfirm(user)}>{user.status === true ? "Disabled" : "Enable"  }</a>
                                          <a className="dropdown-item text-primary pointercursor" onClick={()=>this.setModalState(1,false, user)}>Activities</a>
                                        </div> */}
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