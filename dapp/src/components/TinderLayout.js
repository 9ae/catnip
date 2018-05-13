import React, { Component } from 'react';
import Card from './Card';
import './TinderLayout.css';

const API_ROOT = require('../API_ROOT'); 


class TinderLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userCatId: null,
      currentCatId: null,
      catArray: []
    }

    console.log(API_ROOT)
    fetch(API_ROOT + "/api/getKittiesToDisplay?kittyID=20").then(results => {
      return results.json();
    }).then( data => {
        console.log(data)
        this.setState({catArray: data});
        this.setState({currentCatId: this.state.catArray.pop()});
    })
  }

  componentDidMount(){
    if(this.state.catArray.length < 5){
      fetch("/api/getKittiesToDisplay?kittyID=20").then(results => {
        return results.json();
      }).then( data => {
          this.setState({catArray: data});
      })
    }
  }

  /*voteOnKitty = (yes) => {
    Params { kittyID = [number], likedKittyID = [number], liked = [boolean] }


    if(yes){
      fetch('/api/voteOnKitty', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    kittyID: 'yourValue',
    likedKittyID: 'yourOtherValue',
    liked: yes;
  })
})
    }else

  }*/

  likeCurrent = () => {
    this.likeCat(this.state.currentCatId);
    this.setState({currentCatId: this.state.catArray.pop()});
  }

  skipCurrent = () => {
    this.skipCat(this.state.currentCatId);
    this.setState({currentCatId: this.state.catArray.pop()});
  }

  skipCat = (catId) => {
    console.log(`swiped LEFT on ${catId}`);

  }

  likeCat = (catId) => {
    console.log(`swiped RIGHT on ${catId}`);
  }

  /*nextCat = () => {
    this.setState((prevState, props) => {
        nextCatId == this.state.catArray.pop;
  return {currentCatId: this.state.nextCatId};
  }
    );
  }*/

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
//[{ name: [string], cattributes: [string], imgUrl: [string], price: [number] }]
