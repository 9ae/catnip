import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class TinderLayout extends Component {


  render() {
    return (
    <div class="tbg">
      <div class="theader">
        <i class="fa fa-cog" aria-hidden="true"></i>
        <i class="fa fa-comments" aria-hidden="true"></i>
        <div class="tlogo">
          Catnip &lt;3
        </div>
      </div>
      <div class="tbgwrap">
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
        <Button>Start Meowtching!</Button>
      </div>

      <div class="flex-container">
        <div class = "profileButtons">Settings</div>
        <div class = "ProfileButtons">Profile</div>
      </div>
    </div>
    );

  }
