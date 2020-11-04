import './App.css';
import Game from './game';
import { Router } from '@reach/router'
import Username from './username';
import React, { Component } from 'react'
import VictoryPage from './VictoryPage';


class App extends Component {
  state = {
    user: ''
  }

  setUser = (username) => {
    this.setState({ user: username })
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
          <Game path='/game' name={this.state.user} />
          <VictoryPage path='/win' />
        </Router>
      </div>
    )
  }
}
export default App;
