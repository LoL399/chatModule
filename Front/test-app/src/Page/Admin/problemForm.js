import React, { createRef, useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import Dialog from 'react-bootstrap-dialog';
import DataTable from 'datatables.net';
import { Modal } from 'react-bootstrap';
import { useController, useForm, control  } from "react-hook-form";
import requestService from './service/requestService';
import roleService from './service/roleService';


function ProblemDetail(props) {



  const name = useRef("")
  const description  = useRef("")
  const image = useRef("")

  const [listRole, setListRoles] = useState(0)
  const [role, setRole] = useState(false)

  const {info, room, socket} = props


  const loadData = async ()=>{

    roleService.list().then(async(roles)=>{
      setListRoles(roles.data.data)
    })
    

  }



  useEffect(()=>{
    console.log("props data:", {info},{room});
    loadData()

  },[])

  useEffect(()=>{
    console.log({role});


  },[role])


  const onSubmit = (e) =>{
    if(role)
    {
      const value = {
        problem: name.current.value,
        room: room,
        token: localStorage.getItem("info"),
        handleBy: role
  
      }
      socket.emit('newReq', value)

      // requestService.add(value).then((res)=>{
      //   console.log(res)
      // })
    }


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
            <label class="form-label">Problem:</label>
            <input ref={name} placeholder="Problem's name" class="form-control"/>
          </div>

          <div class="mb-3">
            <label class="form-label">Handle problem by:</label>
            {
              listRole === 0 ? null :
              <select class="form-select" aria-label="Default select example" onChange={(e)=>{setRole(e.target.value)}}>
                <option selected value={false}>Open this select menu</option>
                {
                  listRole.map((role)=>{
                    if(role.name !== "user")
                    {
                      return(
                      
                        <option value={role._id}>{role.name}</option>
  
                      )
                    }

                  })
                }

              </select>
            }
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
          </fieldset>
        </form> );
    
}

export default ProblemDetail;