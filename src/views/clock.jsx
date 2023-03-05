// eslint-disable-next-line no-undef
import React from 'react'

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date().toLocaleTimeString() }
  }

  componentDidMount() {
    console.log(this.props);
    this.timeID = setInterval(() => {
      this.tick()
    }, 1000)
  }

  tick() {
    this.setState({
      date: new Date().toLocaleTimeString(),
    })
  }

  componentWillUnmount() {
    clearInterval(this.timeID)
  }

  render() {
    return (
      <div>
        <div>hello,world</div>
        <h2>it is {this.state.date}</h2>
      </div>
    )
  }
}

export default Clock
