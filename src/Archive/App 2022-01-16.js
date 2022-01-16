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
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          Welcome to Brian's Boardgame Timer!!!
        </p>
        <Timer />
      </header>
    </div>
  );
}


// Define class that creates the timers
class Timer extends React.Component {
  constructor() {
    super();
    let defaultNumPlayers = 3;
    let initialSeconds = 600;
    this.state = {
      numPlayers:defaultNumPlayers,
      initialSeconds: initialSeconds,
      currentPlayer: 0,
      // time:{},
      players: this.makePlayers(defaultNumPlayers, initialSeconds)};
    this.timer = null;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.numerPlayersChange = this.numPlayersChange.bind(this);
    this.initialTimeChange = this.initialTimeChange.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
  }

  // secondsToTime(secs){
  //   let hours = Math.floor(secs / (60 * 60));

  //   let divisor_for_minutes = secs % (60 * 60);
  //   let minutes = Math.floor(divisor_for_minutes / 60);

  //   let divisor_for_seconds = divisor_for_minutes % 60;
  //   let seconds = Math.ceil(divisor_for_seconds);

  //   let obj = {
  //     "h": hours,
  //     "m": minutes,
  //     "s": seconds
  //   };
  //   return obj;
  // }

  secondsToTime(secs){
    let sec_num = secs
    let minutes = Math.floor(sec_num / 60);
    let seconds = sec_num - (minutes * 60);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;}


  makePlayers(numPlayers, initialSeconds) {
    let players = [];
    for (let i=0; i < numPlayers; i++) {
      players = players.concat({
        seconds: initialSeconds,
      })
    }
    return players;
  }

  // componentDidMount() {
  //   let timeLeftVar = this.secondsToTime(this.state.intialSeconds);
  //   this.setState({ time: timeLeftVar });
  // }

  // toggleTimer() {
  //   if (this.timer == 0 && this.state.initialSeconds > 0) {
  //     this.timer = setInterval(this.countDown, 1000);
  //   }
  //   else {
  //     clearInterval(this.timer);
  //   }
  // }

  startTimer() {

    if (this.timer == 0) {
      // Calling this.countdown every second until you call clearInterval on the same timer
      this.timer = setInterval(this.countDown, 1000);
    }
    else {
      clearInterval(this.timer);
      this.timer = 0; // next time you click start button the other branch of the if statement would not trigger without this
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.players[this.state.currentPlayer].seconds - 1;
    this.state.players[this.state.currentPlayer].seconds = seconds;

    // setting the player
    this.setState({
      players: this.state.players,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  numPlayersChange(event) {
    this.setState({ numPlayers: parseInt(event.target.value) });
  }

  initialTimeChange(event) {
    this.setState({ initialSeconds: parseInt(event.target.value)*60 });
  }

  switchPlayer() {
    let nextPlayer = (this.state.currentPlayer + 1) % this.state.numPlayers;
    this.setState({ currentPlayer: nextPlayer});
  }

  render() {
    return(
      <div>
        <div>
          <select name='num-players' id='num-players' defaultValue="3" onChange={this.numPlayersChange}>
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
          <select name='num-minutes' id='num-minutes' defaultValue="10" onChange={this.initialTimeChange}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
            <option value='25'>25</option>
            <option value='25'>30</option>
          </select>
        </div>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.switchPlayer}>Next Player</button>
        <div>
          {this.state.players.map((player, i) => {
            return <div key={i}>

              Player {i} Time: {this.secondsToTime(player.seconds)}
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

/*
OPTION 2
  {
    currentPlayer: 3,
    numPlayers: 4
    players: [
      {
        seconds: 600,
      }
    ]*parseInt(this.state.numPlayers)
  }

  players = []
  for ( 4 times ) {
    players.append {
      seconds: beginningSeconds
    }
  }

  this.state.players[currentPlayer].seconds

  this.timer: every second, subtract 1 from the current player's seconds

  we'll also need buttons for incrementing the currentPlayer to the next player


*/

//ReactDOM.render(<Example/>, document.getElementById('View'));
