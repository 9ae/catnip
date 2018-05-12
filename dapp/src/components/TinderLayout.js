import React, { Component } from 'react';
import Card from './Card';

import './TinderLayout.css';

class TinderLayout extends Component {


  render() {
    return (
      <div class="tbg">
        <div class="theader">
          <i class="fa fa-cog" aria-hidden="true"> link to Settings</i>
          <i class="fa fa-comments" aria-hidden="true"></i>
          <div class="tlogo">
            Catnip &lt;3
          </div>
        </div>
        <div class="tbgwrap">
            <Card
              image='/images/kit1.jpg'
              petname='Cat name'
            />
            <div class="tcontrols">
              <div class="tno"><i class="fa fa-times" aria-hidden="true"></i></div>
              <div class="ti"><i class="fas fa-rocket" aria-hidden="true"></i></div>
              <div class="tyes"><i class="fa fa-heart" aria-hidden="true"></i></div>
            </div>
        </div>
        <div class="credit"><a href="http://themakery.jcink.net">Copyright Catnip 2018</a></div>
      </div>
    );
  }
}

export default TinderLayout;
