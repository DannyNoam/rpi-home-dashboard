import React from "react";
import {pollFor} from "../util/pollUtils.js";
import {executeXHR} from "../util/xhrUtils.js";
import {formatTimePart} from "../util/timeUtils.js";
import Endpoints from "../constants/Endpoints.js";
import ApiKeys from "../constants/ApiKeys.js";
import TrainConstants from "../constants/TrainConstants.js";
import trainTimesConfig from "../config/trainTimesConfig.js";

export default React.createClass({
  
  displayName: 'TrainTimes',
  
  propTypes: {
    refreshRate: React.PropTypes.number.isRequired
  },
  
  getInitialState: function () {
    return {
      trainData: null
    };
  },
  
  componentDidMount: function () {
    pollFor(() => {
      this._getTrainData()
    }, this.props.refreshRate);
  },
  
  render: function () {
    return (
      <div className="arrival-group">
        { this.state.trainData && this._renderDepartureData(3) }
      </div>
    );
  },
  
  _getTrainData: function () {
    let endpoint = this._constructEndpoint();
    
    executeXHR({
      method: 'GET',
      endpoint: endpoint,
      action: (xhr) => this.setState({trainData: JSON.parse(xhr.responseText)})
    });
  },
  
  _renderDepartureData: function (numberToRender) {
    let renderedArrivalsData = [];
    
    for (let i = 0; i < numberToRender; i++) {
      renderedArrivalsData.push(
        <p className="arrivals">
					<span className="destination-name">
						{ this.state.trainData.departures.all[i].destination_name }
					</span>
          <span className="arrival-time">
						{ this.state.trainData.departures.all[i].aimed_arrival_time }
					</span>
        </p>
      );
    }
    
    return renderedArrivalsData;
  },
  
  _constructEndpoint: function () {
    let todaysDateTime = new Date();
    let todaysDate = todaysDateTime.toJSON().slice(0, 10);
    let dateTimeOfTrainsDeparture = new Date(todaysDateTime.getTime() + (trainTimesConfig.TIME_AWAY_FROM_STATION_MINS * 60000));
    let timeOfTrainsDeparture = formatTimePart(dateTimeOfTrainsDeparture.getHours()) + ":" + formatTimePart(dateTimeOfTrainsDeparture.getMinutes());
    
    return Endpoints.TRAINS.BASE_URL + TrainConstants.STATION_CODES.CRS[trainTimesConfig.TRAINS_FROM] + '/' + todaysDate
      + '/' + timeOfTrainsDeparture + '/timetable.json?app_id=' + ApiKeys.TRAINS.ID
      + '&app_key=' + ApiKeys.TRAINS.KEY + '&destination=' + TrainConstants.STATION_CODES.CRS[trainTimesConfig.TRAINS_TO]
      + '&train_status=passenger';
  }
});
