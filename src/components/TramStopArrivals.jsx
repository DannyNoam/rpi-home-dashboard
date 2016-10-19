import React from "react";
import underscore from "underscore";
import Endpoints from "../constants/Endpoints.js";
import {pollFor} from "../util/pollUtils.js";
import {executeXHR} from "../util/xhrUtils.js";
import {calculateMinutesUntilArrival} from "../util/timeUtils.js";

export default React.createClass({
  
  displayName: 'TramStopArrivals',
  
  propTypes: {
    refreshRate: React.PropTypes.number.isRequired
  },
  
  getInitialState: function () {
    return {
      arrivalsData: null
    };
  },
  
  componentDidMount: function () {
    pollFor(() => {
      this._getArrivalsData(Endpoints.TFL.TRAM.WANDLE_PARK_ARRIVALS)
    }, this.props.refreshRate);
  },
  
  render: function () {
    return (
      <div className="tram-stops">
        { this.state.arrivalsData && <div className="arrival-group"> { this._renderArrivalsData('outbound', 3) }</div> }
        { this.state.arrivalsData && <div className="arrival-group"> { this._renderArrivalsData('inbound', 3) }</div> }
      </div>
    );
  },
  
  _getArrivalsData: function (endpoint) {
    executeXHR('GET', endpoint, (xhr) => this.setState({arrivalsData: JSON.parse(xhr.responseText)}));
  },
  
  _renderArrivalsData: function (direction, maxNumberToRender) {
    let arrivalsData = this._getArrivalsByDirection(direction, maxNumberToRender);
    let renderedArrivalsData = [];
    
    arrivalsData.forEach((arrivalData) => {
      renderedArrivalsData.push(
        <p className="arrivals">
					<span className="destination-name">
						{ arrivalData.destinationName }
					</span>
          <span className="arrival-time">
						{ arrivalData.minutesUntilArrival }M
					</span>
        </p>
      );
    });
    
    return renderedArrivalsData;
  },
  
  _getArrivalsByDirection: function (direction, numberToRender) {
    let arrivalsByDirection = underscore.filter(this.state.arrivalsData, (arrival) => arrival.direction === direction);
    let orderedArrivalsData = this._orderArrivalsData(arrivalsByDirection);
    let arrivalsData = [];
    
    for (let i = 0; i < numberToRender; i++) {
      if (!orderedArrivalsData[i]) {
        arrivalsData[i] = this._getDefaultTramArrivalDataObject();
      } else {
        arrivalsData[i] = this._getTramArrivalDataObject(orderedArrivalsData[i]);
      }
    }
    
    return arrivalsData;
  },
  
  _orderArrivalsData: function (arrivalsData) {
    return underscore.sortBy(arrivalsData, (arrival) => arrival.expectedArrival);
  },
  
  _getDefaultTramArrivalDataObject: function () {
    return {
      destinationName: "NO TRAM",
      minutesUntilArrival: "99"
    }
  },
  
  _getTramArrivalDataObject: function (arrivalsData) {
    return {
      destinationName: arrivalsData.destinationName,
      minutesUntilArrival: calculateMinutesUntilArrival(arrivalsData.expectedArrival)
    }
  }
});
