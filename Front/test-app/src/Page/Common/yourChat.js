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

        <div className="col-4 ">
            <div className="chatbox">
                <p>{chat.content}</p>
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