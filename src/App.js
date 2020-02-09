import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch('./data/info.json')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        groups: json.groups.reverse(),
      })
    });
  }

  render() {
    var { isLoaded, groups } = this.state;
    
    if(!isLoaded) {
      return <div> Loading...</div>
    } else {
      return(
        <div className="App">
          {groups.map((group, index) => (
            <div>
              <div className="locationMeta">
              <span className="locationName">{group.name}</span> 
              <span className="locationDate"> {group.date} </span>
              </div>            
            {group.images.map((image, imageIndex) => (
              <img src={"./data/" + image.files['1x']} width={image.size.width+ "px"} height={image.size.height+ "px"} />
            ))}
            </div>
          ))}            
        </div>
      )
    }    
  }
}

export default App;
