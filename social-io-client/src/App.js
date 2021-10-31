import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.1.127:3001";
// const ENDPOINT = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
    }
    this.socket = socketIOClient(ENDPOINT);
  }

  test = () => {
    this.socket.emit('chat message','Hakuna Matata');
  }

  componentDidMount() {
    this.socket.on('chat message', msg => {
      console.log(msg);
      let newArray = this.state.messageList.slice();
      newArray.push(msg);
      this.setState({
        messageList: newArray,
      })
    })
  }

  render() {
    return(
      <>
        <button onClick={this.test}>Test Me</button>
        <ul>
          {this.state.messageList.map((message, index) => {
            return <li key={index}>{message}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default App;