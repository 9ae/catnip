import React, { Component } from 'react';

const SWIPE_RIGHT = 'SWIPE_RIGHT';
const SWIPE_LEFT = 'SWIPE_LEFT';
const SWIPE_NONE = 'SWIPE_NONE';

const THRESHOLD = 30;
const MAX_MOVE = 150;
const MAX_ANGLE = 60;

const DEFAULT_TRANSFORM = 'rotateZ(0)'

class Card extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transform: DEFAULT_TRANSFORM,
      swipeDirection: SWIPE_NONE
    };

    this.mouseX = 0
  }

  dragStart = (evt) => {
    console.log('drag Start @ '+evt.clientX);
    this.mouseX = evt.clientX;

    evt.preventDefault();
  }

  dragging = (evt) => {
    if(this.mouseX === 0) return;
    console.log('moving');

    let diffX = (evt.clientX - this.mouseX)
    const sign = (diffX > 0 ? 1 : -1)

    if(Math.abs(diffX) > MAX_MOVE){
      diffX = MAX_MOVE * sign
    }

    const dA = (Math.abs(diffX)*MAX_ANGLE) / MAX_MOVE

    this.setState({
      transform: `rotateZ(${dA*sign}deg)`,
      swipeDirection: sign === 1 ? SWIPE_RIGHT : SWIPE_LEFT
    })
  }

  dragEnd = (evt) => {
    console.log('drag End @ ' +evt.clientX);
    const diffX = evt.clientX - this.mouseX;
    let direction = SWIPE_NONE;
    if(diffX > THRESHOLD){
      console.log('swipe right')
    }
    else if (diffX < -1*THRESHOLD) {
      console.log('swipe left')
    }

    this.mouseX = 0;
    this.setState({
      transform: DEFAULT_TRANSFORM,
      swipeDirection: SWIPE_NONE
    })

    evt.preventDefault();
  }

  render(){
    return(
      <div class="tphoto"
        draggable="true"
        onMouseDown={this.dragStart}
        onMouseMove={this.dragging}
        onMouseUp={this.dragEnd}
        style={{
          transform: this.state.transform,
          transformOrigin: this.state.swipeDirection === SWIPE_LEFT ? '0% 100%' : '100% 100%'
        }}
      >
        <img
          src={this.props.image}
          title="tphoto"
        />
        <div class="tname">{this.props.petname}</div>
      </div>
    )
  }

}

export default Card;
