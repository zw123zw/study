import FancyBorder from './FancyBorder'
import React from 'react'

class WelcomeDialog extends React.Component {
  // eslint-disable-next-line no-undef
  static contextType = ThemeContext
  render() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">Welcome</h1>
        <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
        <div></div>
      </FancyBorder>
    )
  }
}

export default WelcomeDialog
