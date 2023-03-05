import './App.css'
import Welcome from './views/Welcome'
import Comment from './views/Comment'
import Clock from './views/clock'
import Toggle from './views/Toggle'
import Greeting from './views/Greeting'
import LoginControl from './views/LoginControl'
import List from './views/List'
import Form from './views/Form'
import Reservation from './views/Reservation'
import Calculator from './views/Calculator'
import WelcomeDialog from './views/WelcomeDialog'
import React from 'react'

function formatName(user) {
  return user.firstName + ' ' + user.lastName
}

const user = {
  firstName: 'Happ',
  lastName: 'Perzw',
  avater: 'https://234',
}

function getGreeting(user) {
  if (user) {
    return <h1>hello, {formatName(user)}</h1>
  }
  return <h1>hello, Stranger.</h1>
}

const tabIndex = '-1'

const imgElement = <img src={user.avater}></img>
const title = 'response.potentiallyMailciousInput'
const titleElement = <h1>{title}</h1>
let time = new Date().toLocaleTimeString()

const userData = {
  author: {
    name: 'zwzw',
    avatarUrl: 'http://zwzw',
  },
  text: '111',
  date: new Date(),
}

function activateLasers() {
  console.log(888888)
}

function handleClick(e) {
  e.preventDefault()
  console.log('The link was clicked.')
}

const ThemeContext = React.createContext('light')

function App() {
  return (
    <div>
      <div tabIndex={tabIndex}>{getGreeting(user)}</div>
      <div>{getGreeting()}</div>
      <div>{titleElement}</div>
      <div>{imgElement}</div>
      <img src={user.avater}></img>
      <div>{time}</div>
      <Welcome name="zwzw"></Welcome>
      <Welcome name="cacha"></Welcome>
      <Welcome name="edite"></Welcome>
      <Comment
        author={userData.author}
        text={userData.text}
        date={userData.date}
      ></Comment>
      <Clock name="123"></Clock>
      <button onClick={activateLasers}>点击试试</button>
      <a href="#" onClick={handleClick}>
        Click me
      </a>
      <Toggle></Toggle>
      <Greeting isLoggedIn={false}></Greeting>
      <LoginControl></LoginControl>
      <List></List>
      <Form></Form>
      <Reservation></Reservation>
      <Calculator></Calculator>
      <ThemeContext.Provider value="dark">
        <WelcomeDialog></WelcomeDialog>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
