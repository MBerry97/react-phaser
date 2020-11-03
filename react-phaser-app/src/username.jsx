import React, { Component } from 'react';
import {Link} from '@reach/router'
import logToConsole from './testFunctions'
import styled from "styled-components"
import logo from './assets/logo.png'

const InfoContainer = styled.div`
  width: 80%,
  height: 20%,
  border: 2px solid black;
`;

class Username extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
   let username = event.target.value
    logToConsole(username)
    this.props.setUser(username)
    

  }

  render() {
    return (
      <InfoContainer style={{
        position: 'absolute',
        left: '50%',
        top:'50%',
        transform: 'translate(-50%, -50%)'
      }} >
        <img src={logo} style={{
          width: '60%',
          height: '40%'
        }}/>
        <form onChange={this.handleSubmit}>
        <input type='text' name='username'  ></input>
        </form>
        <Link to='/game'>
        <input type='submit'></input>
        </Link>
      </InfoContainer>
    );
  }
}

export default Username;