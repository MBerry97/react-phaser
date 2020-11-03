import './App.css';
import Game from './game';
import {Router} from '@reach/router'
import Username from './username';
import React,{Component} from 'react'


class App extends Component {
  state = {
  user: ''
  }

  setUser = (username) => {
     this.setState({user: username})
  }

  setGameUser = () => {
    console.log(`hello ${this.state.user}`, "setgameuser");
    return `hello ${this.state.user}`
  }

testLog = () => {
  console.log(`${this.state.user}`)
  return this.state.user
}
 
  render() { 
    return (
    <div className="App">
      <Router>
      <Username path='/' setUser={this.setUser} />
      <Game path='/game' name={this.state.user} setGameUser={this.setGameUser}/>
      </Router>
    </div>
    )
}
}
export default App;
