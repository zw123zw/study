import React from 'react'

class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isGoing: true,
      numberOFGuests: 2,
    }
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <form>
        <label>
          参与：
          <input
            type="checkout"
            name="isGoing"
            checked={this.state.isGoing}
            onChange={this.handleInputChange.bind(this)}
          />
        </label>
        <br />
        <label>
          来宾人数：
          <input
            type="number"
            name="numberOfGuests"
            value={this.state.numberOFGuests}
            onChange={this.handleInputChange.bind(this)}
          />
        </label>
      </form>
    )
  }
}

export default Reservation