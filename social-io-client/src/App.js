import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ChatForm from "./ChatForm/ChatForm";
// const ENDPOINT = "http://192.168.1.127:3001";
const ENDPOINT = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
      value: '',
    }
    this.socket = socketIOClient(ENDPOINT);
  }

  addMessage = (msg) => {
    let msgList = this.state.messageList.slice();
    msgList.push(msg);

    this.setState({
      messageList: msgList,
    });
  };


  handleChange = (event) =>{
    this.setState({
      value: event.target.value
    });
  }

  SubmitHandler = (event) => {
    event.preventDefault();
    if(this.state.value && this.state.value != "") {
      this.socket.emit("chat message", this.state.value);
      this.state.value = "";
    }
  }

  scrollBottom = () => {
    this.formEnd.scrollIntoView({ behavior: "smooth" });
  }

  clearChat = () => {
    this.setState({
      messageList: [],
    });

    this.socket.emit("chat message", "Your local chat has been cleared.");
  }

  componentDidMount() {
    this.socket.on("chat message", (msg) => {
      this.addMessage(msg);
    });
  }

  componentDidUpdate() {
    this.scrollBottom();
  }

  render() {
    return(
      <>
        <div id="ChatList">
          <ul>
            {this.state.messageList.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
          <div ref={(emptyLastElement) => {
            this.formEnd = emptyLastElement;
          }}
          ></div>
        </div>
        <ChatForm 
          SubmitHandler={this.SubmitHandler}
          value={this.state.value}
          handleChange={this.handleChange}
          id={"MessageBox"}
          button1Text={"SEND"}
          button2Text={"Clear"}
          clearChat={this.clearChat}
        />
      </>
    );
  }
}

export default App;