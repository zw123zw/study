import React from 'react'
class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: true,
    }
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <button onClick={() => this.handleClick()}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    )
  }
}

export default Toggle
