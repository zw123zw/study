import React from 'react'

class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', textareaValue: '', selectValue: 'coconut' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleTextareaChange(event) {
    this.setState({
      textareaValue: event.target.value,
    })
  }

  selectChange(event){
    this.setState({
        selectValue: event.target.value,
      })
  }

  handleSubmit(event) {
    console.log('提交的名字: ' + this.state.value)
    console.log('提交的文章: ' + this.state.textareaValue)
    console.log('提交的选项: ' + this.state.selectValue)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字：
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>

        <label>文章：</label>
        <textarea cols="30" rows="10" value={this.state.textareaValue} onChange={this.handleTextareaChange}></textarea>
        <select value={this.state.selectValue} onChange={this.selectChange.bind(this)}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
        </select>
        <input type="submit" value="提交" />
      </form>
    )
  }
}

export default NameForm
