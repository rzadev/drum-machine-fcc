import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const KeyCodes = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Clap",
    url: "https://dl.dropbox.com/s/qv3tj250znw4934/clap.wav"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Nihat",
    url: "https://dl.dropbox.com/s/ofqqpo82guk021z/hihat.wav"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Kick",
    url: "https://dl.dropbox.com/s/2lkj21wph4ghyyu/kick.wav"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Openhat",
    url: "https://dl.dropbox.com/s/d2xoaawza9fplxx/openhat.wav"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Boom",
    url: "https://dl.dropbox.com/s/3bpw6t0rrtdv8jh/boom.wav"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Ride",
    url: "https://dl.dropbox.com/s/mnod8a59zncqvc8/ride.wav"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Snare",
    url: "https://dl.dropbox.com/s/n26i9szf4bplq6m/snare.wav"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Tink",
    url: "https://dl.dropbox.com/s/uorhfrl9ony1tfb/tink.wav"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Tom",
    url: "https://dl.dropbox.com/s/em3kfgxt1hat97b/tom.wav"
  }
];

class DrumMachine extends React.Component {

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }

    const key = document.querySelector(`.drum-pad[data-key="${e.keyCode}"]`);

    key.classList.add("playing");

    function removeTransition(e) {
      if (e.propertyName !== "transform") return;
      this.classList.remove("playing");
    }

    const keys = document.querySelectorAll(".drum-pad");
    keys.forEach(key =>
      key.addEventListener("transitionend", removeTransition)
    );
  };

  playSound = e => {
    // console.log(e);
    const audio = document.getElementById(this.props.keyTrigger);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    this.setState({
      display: this.props.clipId
    })
  };

  render() {
    return (
      <div
        data-key={this.props.keyCode}
        key={this.props.keyCode}
        id={this.props.clipId}
        onClick={this.playSound}
        className="drum-pad"
      >
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        <p class="key">{this.props.keyTrigger}</p>
        <p class="sound">{this.props.clipId}</p>
      </div>
      
    );
  }
}

class PadBank extends React.Component {
  render() {
    let padBank = this.props.padBank.map((drumObj, i, padBankArr) => {
      return (
        <DrumMachine
          clipId={padBankArr[i].id}
          clip={padBankArr[i].url}
          keyTrigger={padBankArr[i].keyTrigger}
          keyCode={padBankArr[i].keyCode}
        />
      );
    });
    return <div className="pad-bank">{padBank}</div>;
  }
}

class App extends React.Component {
  state = {
    padBank: KeyCodes,

  };

  render() {
    return (
      <div id="drum-machine">
        <PadBank padBank={this.state.padBank} />
        <div id='display'>{this.state.display}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
