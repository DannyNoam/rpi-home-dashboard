import React from "react";
import Endpoints from "../constants/Endpoints.js";
import ApiKeys from "../constants/ApiKeys.js";
import CurrentLocation from "../constants/CurrentLocation.js";
import TimeConstants from "../constants/TimeConstants.js";
import {pollFor} from "../util/pollUtils.js";
import {executeXHR} from "../util/xhrUtils.js";
import {getWeatherIcon, convertFahrenheitToCelcius} from "../util/weatherUtils.js";

export default React.createClass({
  
  displayName: 'Weather',
  
  propTypes: {
    refreshRate: React.PropTypes.number.isRequired
  },
  
  getInitialState: function () {
    return {
      weatherData: null
    };
  },
  
  componentDidMount: function () {
    let weatherEndpoint = this._constructWeatherEndpoint(Endpoints.WEATHER, ApiKeys.WEATHER, CurrentLocation.LATITUDE, CurrentLocation.LONGITUDE);
    
    pollFor(() => {
      this._getWeatherData(weatherEndpoint)
    }, this.props.refreshRate);
  },
  
  render: function () {
    return (
      <div id="weather">
        { this.state.weatherData && <i className={ this._constructIconClassName() }></i> }
        { this.state.weatherData && this._renderWeatherData() }
      </div>
    );
  },
  
  _renderWeatherData: function () {
    let celciusTemperature = convertFahrenheitToCelcius(this.state.weatherData.currently.temperature);
    
    return " (" + celciusTemperature + "°C)";
  },
  
  _getWeatherData: function (endpoint) {
    executeXHR({
      method: 'GET',
      endpoint: endpoint,
      action: (xhr) => this.setState({weatherData: JSON.parse(xhr.responseText)})
    });
  },
  
  _constructWeatherEndpoint: function (endpoint, apiKey, latitude, longitude) {
    return endpoint + '/' + apiKey + '/' + latitude + ',' + longitude;
  },
  
  _getDayOrNight: function () {
    let hour = (new Date()).getHours();
    
    return hour > 18 || hour < 6 ? TimeConstants.NIGHT : TimeConstants.DAY;
  },
  
  _constructIconClassName: function () {
    let dayOrNight = this._getDayOrNight();
    let weatherStatus = this.state.weatherData.currently.icon;
    let weatherIcon = getWeatherIcon(weatherStatus, dayOrNight);
    
    return 'wi ' + weatherIcon;
  }
});
