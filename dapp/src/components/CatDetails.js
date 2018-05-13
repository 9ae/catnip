import React, { Component } from 'react';

import './CatDetails.css'

class CatDetails extends React.Component {

  static defaultProps = {
    name: 'Fluffy',
    price: '4,0',
    cattributes: ['Tabby', 'Feral', 'White', 'fluffy', 'gem', 'cute', 'dizzy', 'flying'],
    imgUrl: 'images/kit1.jpg'
  }

  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="wrapper">
        <div className="details">
          <h1>Mate with {this.props.name}</h1>
          <img src={this.props.imgUrl} />
          <p className="price">Cost: {this.props.price}</p>
          <p>Genome</p>
          <ul className="attr">
          {this.props.cattributes.map((cattr) => (<li>{cattr}</li>))}
          </ul>
        </div>
        <div className="fabs">
        <div class="tno">
          <i class="fa fa-times" aria-hidden="true" onClick={this.skipCurrent}></i>
        </div>
        <div class="ti"><i class="fas fa-rocket" aria-hidden="true"></i></div>
        <div class="tyes"><i class="fa fa-heart" aria-hidden="true" onClick={this.likeCurrent}></i></div>
        </div>
      </div>
    )
  }
}

export default CatDetails;
