import { useEffect, useState } from "react"

 function MyChat(data){


    const [chat,setChat] = useState(data.data)

    // useEffect(async ()=>{
    //     console.log(data.data)
    //     setChat(data)
    // },[])

    return (
        <div className="col-12">
        <div className="chatbox userbox">
                {/* <div className=" userbox repliesbox ">
                <small>Reply...</small>
                <br/>
                <img src={"https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} class="imgbox " alt="..."/>
                </div> */}
            <span className="textDisplay">{chat.content}</span>
            
            </div>

        </div>
    )

}

export default MyChat