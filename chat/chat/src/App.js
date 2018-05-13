// import packages
import React, { Component } from 'react'
import io from 'socket.io-client';
var Web3 = require('web3');

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
      message:"",
      load: false,
      gas:4
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
    this.safari = this.safari.bind(this);
    this.checkBalance = this.checkBalance.bind(this);

    this.socket.on('RECEIVE_MESSAGE', function(data){
    addMessage(data);
  });

    //this.socket.on('RECIEVE_ACCEPT',function(data){sendAccept()});

  this.socket.on('RECEIVE_REJECT',function(data){
    //console.log("recieving");
    addReject(data)
  });

  this.socket.on('RECEIVE_ACCEPT',function(){
    addAccept();
  })

  const addMessage = data => {
      //console.log("Data",data);
      this.setState({chat_history: [...this.state.chat_history,data]});
      //console.log(this.state.messages);
    };

const addAccept = ()=>{
  alert("Accepted!");
}

const addReject = data =>{
  //console.log("Rejected Data",data);
  data.status="Rejected";
  let chat = this.state.chat_history;
  chat.splice(-1,1);
  chat.push(data);
  this.setState({chat_history:[...this.state.chat_history]});
  //console.log(chat);
}


}

componentWillMount(){

  window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)

        if (window.web3.currentProvider.isMetaMask === true) {
            window.web3.eth.getAccounts((error, accounts) => {
                if (accounts.length === 0) {
                    // there is no active accounts in MetaMask
                }
                else {
                    // It's ok
                }
            });
        } else {
            // Another web3 provider
        }
    } else {
        alert("App will not work if MetaMask is not installed");

    }
});
}

componentDidMount(){
  if(window.web3===undefined){
    this.setState({user:localStorage.getItem("username"),load:true});
  }
  else this.setState({user:localStorage.getItem("username")});
}

checkBalance(bid){
 bid = parseFloat(bid);
 if(bid <=0) return Promise.reject(false);
 console.log("bid",bid);

 const balanceIsSufficient = (balance,gp,bid) => {
   //console.log(balance);
   balance = parseFloat(window.web3.utils.fromWei(balance, 'ether'));
   //console.log("Balance",balance);
   let fee = parseInt(gp)*parseInt(this.state.gas);
   console.log("fee",fee.toString());
   fee = parseFloat(window.web3.utils.fromWei(fee.toString(),"ether"));
   //console.log("bid2",bid,typeof(fee));
   console.log("check add", fee+bid);
  //console.log("fee",fee.toString());
  console.log("check",balance >(bid),balance,(bid));
   return balance > (bid+fee);

 };

  let amount = this.state.message;
  let gas = this.state.gas;
  let gasPrice;

    return window.web3.eth.getGasPrice().then((gp)=>{
      gasPrice = gp;
      return Promise.resolve()
    }).then(() => {console.log(gasPrice);
      return window.web3.eth.getAccounts();
    }).then((accounts) => {
      return Promise.all(accounts.map(acc => window.web3.eth.getBalance(acc)));
    }).then((balances) => {
      return balances.map(balance => {return balanceIsSufficient(balance,gasPrice,bid)});
    }).then((sufficients) => {
      return sufficients.reduce((a, b) => a || b, false);
    })
      /**
      winow.web3.eth.getAccounts().then(accounts=>{
        accounts.map(account=>{
          window.web3.eth.getBalance(account).then(balance=>{


          });
        });
      });
      **/
}

safari(){
  this.setState({load:true});
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
  this.checkBalance(this.state.message).then(truth=>{
    //console.log("truth",truth);
    if(truth){this.sendMsg(e);}
    else  alert("Insuffient Funds to Send Bid");
  }).catch(err =>{
  });
}

getMsgCount(){
  let current = this.state.message_count+1;
  //console.log(current);
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
    let truth = this.checkBalance(this.state.message);
    if(truth) this.socket.emit('SEND_ACCEPT');
    else alert("Insuffient Funds to Accept Bid");
  }

  sendReject = (ev) => {
    ev.preventDefault();
    let l = this.state.chat_history.length;
    this.socket.emit('SEND_REJECT',this.state.chat_history[l-1]);
    this.setState({message:''});
  }

  render() {
    //console.log("Window web3",window.web3.eth);
    //console.log("Accounts",window.web3.eth.getAccounts(console.log));
    if(this.state.load) return <div>Please use a browser with MetaMask Installed</div>
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.chat_history.map(blob=>{

          if(this.state.chat_history[this.state.chat_history.length-1]!==blob || blob.status==="Rejected"){
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
