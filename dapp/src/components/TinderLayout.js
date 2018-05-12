import React, { Component } from 'react';

import './TinderLayout.css';

class TinderLayout extends Component {
  render() {
    return (
      <div class="tbg">
        <div class="theader">
          <i class="fa fa-cog" aria-hidden="true"></i>
          <i class="fa fa-comments" aria-hidden="true"></i>
          <div class="tlogo">
            <img src="https://worldvectorlogo.com/logos/tinder-1.svg"  title="Tinder Logo" />
          </div>
        </div>
        <div class="tbgwrap">
          <div class="tphoto">
              <img src="http://www.amicnews.com/wp-content/uploads/2015/04/Sunglasses-Trends-for-Summer-2015.jpg" title="tphoto"  />
              <div class="tname">Pussy Cat, <span class="age">27</span></div>
              <div class="tinfo"><i class="fa fa-book" aria-hidden="true"> 0</i><i class="fa fa-users" aria-hidden="true"> 0</i></div>
            </div>
            <div class="tcontrols">
              <div class="tno"><i class="fa fa-times" aria-hidden="true"></i></div>
              <div class="ti"><i class="fa fa-info" aria-hidden="true"></i></div>
              <div class="tyes"><i class="fa fa-heart" aria-hidden="true"></i></div>
            </div>
        </div>
        <div class="credit"><a href="http://themakery.jcink.net">Copyright Catnip 2018</a></div>
      </div>
    );
  }
}

export default TinderLayout;
