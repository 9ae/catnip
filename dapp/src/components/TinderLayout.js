import React, { Component } from 'react';
import Card from './Card';
import './TinderLayout.css';
import request from 'superagent';


const API_ROOT = require('../API_ROOT').API_ROOT; 
const MOCK_KITTY_ID = 121638; 

class TinderLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userCatId: MOCK_KITTY_ID,
      currentCat: null,
      catArray: [],
      loading: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
      request
          .get(API_ROOT + "/api/getKittiesToDisplay?kittyID=" + this.state.userCatId)
          .then((res) => {
            const currentCat = res.body.pop();
            console.log(currentCat)
            this.setState({catArray : res.body});
            this.setState({currentCat : currentCat}) 
          }); 
  };

  getNextCat = () => {
        console.log('in get next')

        this.setState({currentCat: this.state.catArray.pop()});

        if(!this.state.loading && this.state.catArray.length < 5) {

          this.setState({loading : true}); 

          request
          .get(API_ROOT + "/api/getKittiesToDisplay?kittyID=" + this.state.userCatId)
          .then((res) => {
            this.setState({catArray : this.state.catArray.concat(res.body)});
            this.setState({loading : false}); 

          }); 
        }
  }

  sendLike = (likedKittyID, liked) => {

    console.log('sending LIke'); 

    request
      .post(API_ROOT + '/api/voteOnKitty')
      .send({
          kittyID: this.state.userCatId,
          likedKittyID: likedKittyID,
          vote : liked ? "liked" : "disliked"
      }).then((r) => {
        console.log(r)
      });

  }


  likeCurrent = () => {
    this.sendLike(this.state.currentCat._id, true);
    this.getNextCat(); 
  }

  skipCurrent = () => {
    this.sendLike(this.state.currentCat._id, false);
    this.getNextCat(); 
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
      <div className="tbg">
        <div class="theader">
          <i className="fa fa-cog" aria-hidden="true"> link to Settings </i>
          <i className="fa fa-comments" aria-hidden="true"></i>
          <div className="tlogo">
            Catnip &lt;3
          </div>
        </div>
        <div className="tbgwrap">
            <Card
              image={this.state.currentCat ? this.state.currentCat.img : ''}
              catPrice={this.state.currentCat ? this.state.currentCat.price : ''}
              rareAttr={this.state.currentCat ? this.state.currentCat.name : ''}
              catId={this.state.currentCat ? this.state.currentCat.id : ''}
              onSwipeRight={this.likeCat}
              onSwipeLeft={this.skipCat}
            />
            <div className="tcontrols">
              <div className="tno">
                <i className="fa fa-times" aria-hidden="true" onClick={this.skipCurrent}></i>
              </div>
              <div className="ti"><i className="fas fa-rocket" aria-hidden="true"></i></div>
              <div className="tyes"><i className="fa fa-heart" aria-hidden="true" onClick={this.likeCurrent}></i></div>
            </div>
        </div>
      </div>
    );
  }
}

export default TinderLayout;
//[{ name: [string], cattributes: [string], imgUrl: [string], price: [number] }]
