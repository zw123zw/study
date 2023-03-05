import UserInfo from "./UserInfo.jsx"

function formatDate(date){
    return JSON.stringify(date)
}

function Comment(props){
    return (
        <div className="Comment">
            <UserInfo user={props.author}></UserInfo>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    )
}

export default Comment