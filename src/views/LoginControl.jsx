import React from 'react'

class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = {
      isLoggedIn: false,
    }
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true,
    })
  }

  handleLogoutClick() {
    this.setState({
      isLoggedIn: false,
    })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    return (
        <div>
            <h1>与运算符</h1>
            {!isLoggedIn && <h2>登录</h2>}
        </div>
    )
  }
}

export default LoginControl
