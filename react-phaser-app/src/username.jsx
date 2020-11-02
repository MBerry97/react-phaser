import React, { Component } from 'react';
import {Link} from '@reach/router'
import logToConsole from './testFunctions'

class Username extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
   let username = event.target.value
    logToConsole(username)
    this.props.setUser(username)
    

  }

  render() {
    return (
      <div>
        <form onChange={this.handleSubmit}>
        <input type='text' name='username'  ></input>
        </form>
        <Link to='/game'>
        <input type='submit'></input>
        </Link>
      </div>
    );
  }
}

export default Username;