import React from "react";
import pollFor from "../util/pollUtils.js";
import {getDigitallyFormattedTime} from "../util/timeUtils.js";

const TIME_REFRESH_RATE = 1000;

export default React.createClass({
  
  displayName: 'Time',
  
  getInitialState: function () {
    return {
      time: null
    };
  },
  
  componentDidMount: function () {
    pollFor(() => {
      this._setTime()
    }, TIME_REFRESH_RATE);
  },
  
  render: function () {
    return (
      <div id="time">
        { this.state.time && <p className="time">{ this.state.time }</p> }
      </div>
    );
  },
  
  _setTime: function () {
    this.setState({
      time: getDigitallyFormattedTime()
    });
  }
});
