// StopWatch class component - tracks the number of milliseconds passed and associates state with the values created with start, stop, and reset methods
class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassedInMilliSeconds: 0,
    };

    this.timer = null;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  // start method - checks if a timer is already present, and keeps track of the time elapsed starting from 0,
  //                or if a timer was already created, adds time elapsed onto previous value
  start() {
    if (!this.timer) {
      let startTime = Date.now();
      this.timer = setInterval(() => {
        const stopTime = Date.now();
        const timePassedInMilliSeconds =
          stopTime - startTime + this.state.timePassedInMilliSeconds;

        this.setState({
          timePassedInMilliSeconds,
        });

        startTime = stopTime;
      }, 250); // Executed every 250 millisecond
    }
  }

  // stop method - stops the time elapsed value from increasing once called and clears the current timer
  stop() {
    window.clearInterval(this.timer);
    this.timer = null;
  }

  // reset method - stops the current time and resets the timers state back to it's default of 0 milliseconds
  reset() {
    this.stop();
    this.setState({
      timePassedInMilliSeconds: 0,
    });
  }

  // render method - display the timer's state in seconds and renders three buttons to control each method belonging to the StopWatch class object
  render() {
    return (
      <div>
        <h2
          className="border px-3 py-4 rounded my-3 mx-auto text-center"
          style={{ maxWidth: "300px" }}
        >
          {Math.floor(this.state.timePassedInMilliSeconds / 1000)} s
        </h2>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-primary mr-2" onClick={this.start}>
            start
          </button>
          <button className="btn btn-outline-danger mr-2" onClick={this.stop}>
            stop
          </button>
          <button className="btn btn-outline-warning" onClick={this.reset}>
            reset
          </button>
        </div>
      </div>
    );
  }
}

// Render the StopWatch component in the React DOM
ReactDOM.render(<StopWatch />, document.getElementById("root"));
