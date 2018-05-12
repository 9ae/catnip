import React, { Component } from 'react';
import Card from './Card';

import './TinderLayout.css';

class TinderLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCatId: null
    }
  }

  likeCurrent = () => {
    this.likeCat(this.state.currentCatId);
  }

  skipCurrent = () => {
    this.skipCat(this.state.currentCatId);
  }

  skipCat = (catId) => {
    console.log(`swiped LEFT on ${catId}`);
  }

  likeCat = (catId) => {
    console.log(`swiped RIGHT on ${catId}`);
  }

  render() {
    return (
      <div class="tbg">
        <div class="theader">
          <i class="fa fa-cog" aria-hidden="true"> link to Settings </i>
          <i class="fa fa-comments" aria-hidden="true"></i>
          <div class="tlogo">
            Catnip &lt;3
          </div>
        </div>
        <div class="tbgwrap">
            <Card
              image='/images/kit1.jpg'
              catPrice='4,000'
              rareAttr='Feral'
              catId='abc'
              onSwipeRight={this.likeCat}
              onSwipeLeft={this.skipCat}
            />
            <div class="tcontrols">
              <div class="tno">
                <i class="fa fa-times" aria-hidden="true" onClick={this.skipCurrent}></i>
              </div>
              <div class="ti"><i class="fas fa-rocket" aria-hidden="true"></i></div>
              <div class="tyes"><i class="fa fa-heart" aria-hidden="true" onClick={this.likeCurrent}></i></div>
            </div>
        </div>
      </div>
    );
  }
}

export default TinderLayout;
