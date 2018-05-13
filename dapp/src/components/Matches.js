import React, { Component } from 'react';

class Matches extends Component {

  static defaultProps = {
    matches: [
      {myCat: {
        imgUrl: "",
        name: "Brisk"
      },
      theirCat: {
        imgUrl: "",
        name: "Swift"
      },
      status: "Negotiating"
    }
    ]
  }

  constructor(props){
    super(props);

  }

  render() {
    return (<div className="container">
      <h1>Meowtches</h1>
      <div className="match-list">
        {this.props.matches.map((m)=>(
          <div className="match">
            <div className="row">
            <div className="cat mine">
              <img src={m.myCat.imgUrl} />
              <p className="name">{m.myCat.name}</p>
            </div>
            <div className="heart"><i className="fa fa-heart" aria-hidden="true" /></div>
            <div className="cat their">
            <img src={m.myCat.imgUrl} />
            <p className="name">{m.myCat.name}</p>
            </div>
            </div>
            <div className="status">{m.status}</div>
          </div>
        ))}
      </div>
    </div>)
  }

}

export default Matches;
