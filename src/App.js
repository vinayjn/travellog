import React, { Component } from 'react';
import './App.css';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
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
              <div>
              <LazyLoadImage
                effect="opacity"
                delayTime="10000"
                alt={image.alt}
                height={image.height}
                src={"./data/" + image.files['1x']} // use normal <img> attributes as props
                width={image.width} />                                                  
                </div>
            ))}
            </div>
          ))}            
        </div>
      )
    }    
  }
}

export default App;
