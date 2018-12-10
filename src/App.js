/*global swal*/

import React, { Component } from "react";
import logo from "./logo.svg";
import loading from "./loading.svg";
import "./App.css";
import Sound from "react-sound";
import Button from "./Button";

const apiToken =
  "BQBrrDazdrA3BBFoF915cemIsxLosqPqsipZzYVqcDntg3-GsFNCbZSPixJJ2NHddtLkRZpL2e7Js22LeuAKRnK82lQI0ubCmXy3bvKXleqR1_0wOwvghIMACOWGpdqKuK50wLx1h-mk42zUXN_WZxra-ZfRWoT_E5bAGlsgLi4q";

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <img src={this.props.track.album.images[0].url} />;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "Ceci est un bruit blanc",
      songsLoaded: false,
      tracks: {}
    };
  }

  componentDidMount() {
    this.setState({ text: "Musique play " });
    fetch("https://api.spotify.com/v1/me/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiToken
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        this.setState({ tracks: data.items });

        this.setState({
          songsLoaded: true
        });
      });
  }

  render() {
    if (!this.state.songsLoaded) {
      return (
        <div className="App">
          <div className="App">
            <img src={loading} alt="loading" />
          </div>
        </div>
      );
    } else {
      const track1 = this.state.tracks[0].track;
      console.log(this.state.tracks[0].track.name);
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <p>{this.state.tracks[0].track.name}</p>
            <AlbumCover track={this.state.tracks[0].track} />
            <Sound
              url={this.state.tracks[0].track.preview_url}
              playStatus={Sound.status.PLAYING}
            />
          </div>
          <div className="App-buttons" />
        </div>
      );
    }
  }
}

export default App;
