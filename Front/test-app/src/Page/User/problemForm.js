import React, { createRef, useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import Dialog from 'react-bootstrap-dialog';
import DataTable from 'datatables.net';
import { Modal } from 'react-bootstrap';
import { useController, useForm, control  } from "react-hook-form";

function ProblemForm(){


  const [modal, modalState]= useState(false)

    // useEffect(()=>{

    // },[])

    // const data ={
    //   name: "L"
    // }


    return(

    <div className="row justify-content-center">
        <div className="col-12">
        <div className="row mb-4 items-align-center">
        <h2 className="mb-2 page-title">User's info control</h2>
          {/* <div className="col-md-auto ml-auto text-right">
            <button type="button" className="btn" onClick={()=>modalState(!modal)}><span className="fe fe-plus fe-24 text-muted text-primary" ></span></button>
          </div> */}
        </div>
        <div className="row my-4">

          <div className="col-md-12">
            <div className="card shadow">
              <div className="card-body">
                  <ProblemDetail/>
            
              </div>
            </div>
          </div> 
          </div> 

    {/*  */}
    {/* <Modal
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
  </Modal> */}

</div>

    </div>)

}


function ProblemDetail(data) {

  const [disable, disableChange] = useState(true)


  const name = useRef("")
  const problem = useRef("")
  const image = useRef("")



  useEffect(()=>{
    console.log("props data:", data.data);

  },[])


  const onSubmit = (e) =>{

    // const value = {
    //   name: name.current.value,
    //   email: email.current.value,
    //   role: role.current.value
    // }
    // console.log(value)
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
            <input ref={name} placeholder="ur name" class="form-control"/>
          </div>

          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input ref={problem} placeholder="ur problem?"  class="form-control"/>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
          </fieldset>
        </form> );
    
}

export default ProblemForm;