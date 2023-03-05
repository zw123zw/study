import Avatar from './Avatar'

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user}></Avatar>
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  )
}

export default UserInfo
