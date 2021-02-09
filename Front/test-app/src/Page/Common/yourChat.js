import { useState } from "react"

function YourChat(data){

    const [chat,changeChat] = useState(data.data)

    return (
        <div className="row">
            {/* <div className="col-1">
            <span className="avatar-sm mt-2">
                <img src={"https://pbs.twimg.com/media/D1EKW0cXcAAwQMg.jpg"} alt="..." className="avatar-img rounded-circle"/>
            </span>
            </div> */}

        <div className="col-10">
            <div className="chatbox">
                <span className="textDisplay">{chat.content}</span>
                {chat.fromUser?.name === null ? null : <small className="font-italic">by: {chat.fromUser?.name}</small>    }
            </div>
            {/* <div className="chatbox repliesbox ">
            <small>Reply...</small>
            <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
            </div> */}

        </div>
    </div>
    )
}

export default YourChat