// import packages
import React, { Component } from 'react'
import io from 'socket.io-client';

function newBlob(given_price,user,msg_count){
return {
    message_id: msg_count,
    price: given_price,
    sender: user,
    status: "pending"
  }
}

// Making the App component
class App extends Component {
  constructor() {
    super()

    this.state = {
      user:"",
      endpoint: "http://localhost:4001", // this is where we are connecting to with sockets
      chat_history:[],
      message_count:0,
      blobStyle : {border:"1px solid orange"},
      message:""
    }
    this.socket = io('localhost:4001');
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getMsgCount = this.getMsgCount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.sendReject = this.sendReject.bind(this);
    this.sendAccept = this.sendAccept.bind(this);

    this.socket.on('RECEIVE_MESSAGE', function(data){
    addMessage(data);
  });

    //this.socket.on('RECIEVE_ACCEPT',function(data){sendAccept()});

  this.socket.on('RECEIVE_REJECT',function(data){
    console.log("recieving");
    addReject(data)
  });

  this.socket.on('RECEIVE_ACCEPT',function(){
    addAccept();
  })

  const addMessage = data => {
      console.log("Data",data);
      this.setState({chat_history: [...this.state.chat_history,data]});
      console.log(this.state.messages);
    };

const addAccept = ()=>{
  alert("Accepted!");
}

const addReject = data =>{
  console.log("Rejected Data",data);
  data.status="Rejected";
  let chat = this.state.chat_history;
  chat.splice(-1,1);
  chat.push(data);
  this.setState({chat_history:[...this.state.chat_history]});
  console.log(chat);
}

}

componentDidMount(){
  this.setState({user:localStorage.getItem("username")})
}

handleAccept(ev){
  this.sendAccept(ev);
}

handleReject(ev){
  this.sendReject(ev);
}

handleChange(event){
  this.setState({message: event.target.value});
}

handleSubmit(e){
  e.preventDefault();
  this.sendMsg(e);
}

getMsgCount(){
  let current = this.state.message_count+1;
  console.log(current);
  this.setState({message_count:current});
  return current;
}

  // method for emitting a socket.io event
  sendMsg = (ev) => {
    ev.preventDefault();
    let count = this.getMsgCount();
    this.socket.emit('SEND_MESSAGE',newBlob(this.state.message,this.state.user,count));
    this.setState({message: ''});
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  }

  sendAccept = (ev) => {
    ev.preventDefault();
    this.socket.emit('SEND_ACCEPT');
  }

  sendReject = (ev) => {
    ev.preventDefault();
    let l = this.state.chat_history.length;
    this.socket.emit('SEND_REJECT',this.state.chat_history[l-1]);
    this.setState({message:''});
  }

  render() {

    return (
      <div style={{ textAlign: "center" }}>
        {this.state.chat_history.map(blob=>{
          console.log("blob",blob,this.state.chat_history[this.state.chat_history.length-1]!==blob);
          if(this.state.chat_history[this.state.chat_history.length-1]!==blob || blob.status=="Rejected"){
            return (
              <div key={blob.message_id}>
                <span>{blob.message_id}:</span>&nbsp;
                <span>{blob.sender}</span><br/>
                <span>{blob.price}</span><br/>
                <span>{blob.status}</span>
                <div>
                </div><br/>
              </div>
                  )
          }
          else return (
            <div key={blob.message_id}>
              <span>{blob.message_id}:</span>&nbsp;
              <span>{blob.sender}</span><br/>
              <span>{blob.price}</span><br/>
              <span>{blob.status}</span>
              <div>
                <span onClick={this.handleAccept}>✔</span>
                &nbsp;|&nbsp;
                <span onClick={this.handleReject}>ｘ</span>
              </div><br/>
            </div>
          )
          })
        }
        <input type="Text" value={this.state.message} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>send</button>
      </div>
    )
  }
}

export default App
