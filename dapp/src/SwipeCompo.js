import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card';

import './Swipe.css'

class SwipeCompo extends Component {

    constructor(props) {
      super(props);
      this.state = {
        cats : ['Garfield', 'Meowth', 'Hello Kitty'],
        isReady: false
      };
    }

    componentDidMount() {
      this.setState({isReady: true})
    }

    action (eventType) {
      console.log(this.state.isReady);
      console.log(eventType +' on '+ this.state.cats[0]);
      /*
      if(this.state.cats.length > 0 ) {
        this.setState({ cats: this.state.cats.slice(0,1) })
      }
      */
    }

    render () {
      const kitties = this.state.cats;
      return (
          <Cards onEnd={this.action('end')} className='master-root'>
            {kitties.map(item =>
              <Card
                onSwipeLeft={this.action('swipe left')}
                onSwipeRight={this.action('swipe right')}>
                <h2>{item}</h2>
              </Card>
            )}
        </Cards>
      )
    }
}

export default SwipeCompo;
