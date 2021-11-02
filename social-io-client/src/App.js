import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ChatForm from "./ChatForm/ChatForm";
import Message from "./Message/Message";
// const ENDPOINT = "http://192.168.1.127:3001";
const ENDPOINT = "http://localhost:3001";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [{
        username: 'System',
        text: 'This is the start of your chat.',
        theme: 'bg-light',
      }],
      username: 'Raoul',
      userMessage: '',
      isImportant: false,
    }
    this.socket = socketIOClient(ENDPOINT);
  }

  handleMessageBoxChange = (event) => {
    this.setState({
      userMessage: event.target.value,
    });
  }
  
  handleImportantChange = (event) => {
    this.setState({
      isImportant: event.target.checked
    }, () => {
      console.log(this.state.isImportant);
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    
    if(this.state.userMessage.trim() === '') {
      return;
    }

    this.socket.emit('chat message', {
      username: this.state.username,
      text: this.state.userMessage,
      theme: this.state.isImportant ? 'bg-danger' : 'bg-light',
    });

    this.resetForm();
  }

  resetForm = () => {
    this.setState({
      userMessage: '',
      isImportant: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.messageList.length !== this.state.messageList.length) {
      this.moveMessageList();
    }
  }

  moveMessageList() {
    let chatList = document.getElementById("ChatList");
    chatList.scrollTop = chatList.scrollHeight;
  }

  componentDidMount() {
    this.socket.on('chat message', (msg) => {
      this.updateMessages(msg);
    })
  }

  updateMessages = (msg) => {
    let newArray = this.state.messageList.slice();
    newArray.push({
      username: msg.username,
      text: msg.text,
      theme: msg.theme,
    });

    this.setState({
      messageList: newArray
    });
  }

  clear = () => {
    this.setState({
      messageList: [{
        username: 'System',
        text: 'Your local chat has been cleared.',
        theme: 'bg-info',
      }]
    })
  }




  render() {
    return(
      <>
        <div className="container">
          <div className="row">
            <div className="col-3 col-sm-1"></div>
            <div className="col-6 col-sm-10 App">
              <div id="ChatList">
                {this.state.messageList.map((message, index) => {
                  return (
                    <Message key={index}
                      username={message.username}
                      message={message.text}     
                      theme={message.theme} />
                  );
                })}
              </div>
              <form onSubmit={this.handleFormSubmit}>
                <div className="form-control">
                  <div className="row">
                    <div className="col">
                      <div><small>You are writting as: <strong>{this.state.username}</strong></small></div>
                      <div class="input-group">
                        <div class="input-group-text">
                          <label><input checked={this.state.isImportant} onChange={this.handleImportantChange} type="checkbox" /> ❗</label>
                        </div>
                        <input
                          id="MessageBox"
                          value={this.state.userMessage}
                          type="text"
                          className="form-control"
                          placeholder="Start typing..."
                          onChange={this.handleMessageBoxChange}
                        />
                        <button type="submit" className="btn btn-primary">SEND</button>
                        <button type="button" className="btn btn-info" onClick={this.clear}>CLEAR</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;