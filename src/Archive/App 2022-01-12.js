import logo from './logo.svg';
import './App.css';

// import react so that stackoverflow code works
import React from 'react';

// define App function that is then rendered in index.js
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Brian's Boardgame Timer!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Timer />

      </header>


    </div>
  );
}


// Define class that creates the timers
class Timer extends React.Component {
  constructor() {
    super();
    // creates the
    this.state = { numPlayers:3, time: {}, seconds: 600 };
    this.timer = 0;
    this.toggleTimer = this.toggleTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  toggleTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
    else {
      clearInterval(this.timer);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  handleChange(event) {
    this.setState({ numPlayers: parseInt(event.target.value) });
  }

  timeChange(event) {
    this.setState({ seconds: parseInt(event.target.value)*60 });
  }

  render() {
    return(
      <div>
        <div>
          <select name='num-players' id='num-players' defaultValue="3" onChange={this.handleChange}>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
        </div>
        <div>
          <label for='num-players'>Number of players: {this.state.numPlayers}</label>
        </div>
        <div>
          <label for='num-players'>Time limit (minutes): </label>
          <select name='num-minutes' id='num-minutes' defaultValue="10" onChange={this.timeChange}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
            <option value='25'>25</option>
            <option value='25'>30</option>
          </select>
        </div>
        <div>
          {Array.apply(0, Array(this.state.numPlayers)).map((x, i) => {
            return <div key={i}>
              <button onClick={this.toggleTimer}>Start</button>
              m: {this.state.time.m} s: {this.state.time.s}
            </div>
          })
          }
        </div>
      </div>
    );
  }
}

export default App;


//##########################################################



//ReactDOM.render(<Example/>, document.getElementById('View'));
