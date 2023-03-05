import React from 'react'
import TemperatureInput from './TemperatureInput'

class Calculator extends React.Component {
  render() {
    return (
        <div>
            <TemperatureInput scale="c"></TemperatureInput>
            <TemperatureInput scale="f"></TemperatureInput>
        </div>
    )
  }
}

export default Calculator
