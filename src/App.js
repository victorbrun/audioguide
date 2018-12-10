/*global swal*/

import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import Button from "./Button";
import ReactPlayer from 'react-player'


/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}


const TRACKS = [
  "https://www.youtube.com/watch?v=-GPkqoQz2vo&app=desktop",
  "https://www.youtube.com/watch?v=hR_ijUsHpuE",
  "https://www.youtube.com/watch?v=BJWoFagy4Bc",
  "https://www.youtube.com/watch?v=sFrNsSnk8GM",
  "https://www.youtube.com/watch?v=NrgcRvBJYBE"
];

const N_TRACKS = TRACKS.length;

const AudioGuide = ({url, playing}) => (
  <ReactPlayer
              url={url}
              pip={false}
              height={0}
              width={0}
              playing={playing}
  />
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      play: [false,false],
    };
  }

  togglePlay = (i) => {
    var playBools = new Array(N_TRACKS).fill(false);
    playBools[i] = !this.state.play[i];
    this.setState({ play: playBools });
  };

  render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div>
          {   TRACKS.map((url, index) => <AudioGuide url={url} playing={this.state.play[index]} />)}
          {
            TRACKS.map((url,index) =>
              <button className="App-player" onClick={()=>this.togglePlay(index)}>
                 {index + 1}
               </button>
            )}
          </div>
        </div>
      );
  }
}

export default App;
