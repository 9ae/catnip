import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userCats: []
    }

    fetch('/api/getKittyList')
    .then(results => {
      return results.json();
    }).then( data => {
        console.log(data)
        this.setState({userCats: data});
    })
  }
  render() {
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
                        <div>
                            <img src="assets/1.jpeg" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src="assets/2.jpeg" />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src="assets/3.jpeg" />
                            <p className="legend">Legend 3</p>
                        </div>
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
