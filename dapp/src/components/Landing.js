import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel, Button } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import request from 'superagent';
// const Web3 = require('web3');
const API_ROOT = require('../API_ROOT').API_ROOT;

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      userCats: []
    }
  }

  // componentWillMount(){
  //    window.addEventListener('load', function () {
  //      if (typeof web3 !== 'undefined') {
  //          window.web3 = new Web3(window.web3.currentProvider)
  //          if (window.web3.currentProvider.isMetaMask === true) {
  //              window.web3.eth.getAccounts((error, accounts) => {
  //                  if (accounts.length === 0) {
  //                      // there is no active accounts in MetaMask
  //                  }
  //                  else {
  //                      // It's ok
  //                  }
  //              });
  //          } else {
  //              // Another web3 provider
  //          }
  //      } else {
  //          alert("App will not work if MetaMask is not installed");
  //
  //      }
  //   });
  // }

  componentDidMount(){
    // const acc = window.web3.eth.getAccounts()[0];
    const acc = '0x7Ce0448B0FAFAB6cAce981fFFA967cf380A2cc33';
    this.setState({address: acc});
    request
    .get(API_ROOT+'/api/getKittyList?address='+this.state.address)
    .set('accept', 'json')
    .then( data => {
        console.log(data);
        this.setState({userCats: data.body});
    })
  }

  render() {
    const catShow = this.state.userCats.filter((el) => el.img).map( el => {
        <div>
            <img src={el.img ? el.img : ''}/>
            <p className="legend">Legend 1</p>
        </div>
      }
    );

    console.log(catShow)


    return (
    <div className="tbg">
      <div className="theader">
        <i className="fa fa-cog" aria-hidden="true"></i>
        <i className="fa fa-comments" aria-hidden="true"></i>
        <div className="tlogo">
          Catnip &lt;3
        </div>
      </div>
      <div className="tbgwrap">
        <h2>Choose your kitty</h2>
        <Carousel>
            {catShow}
        </Carousel>
        <div>Price</div>
      </div>

      <div className="flex-container">
        <div className = "profileButtons">Settings</div>
        <div className = "ProfileButtons">Profile</div>
      </div>
    </div>
    );

  }
}

export default Landing;
