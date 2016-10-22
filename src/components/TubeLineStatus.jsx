import React from "react";
import underscore from "underscore";
import TflConstants from "../constants/TflConstants.js";
import Endpoints from "../constants/Endpoints.js";
import {pollFor} from "../util/pollUtils.js";
import {executeXHR} from "../util/xhrUtils.js";

export default React.createClass({
  
  displayName: 'TubeLineStatus',
  
  propTypes: {
    refreshRate: React.PropTypes.number.isRequired
  },
  
  getInitialState: function () {
    return {
      tubeStatusData: null
    };
  },
  
  componentDidMount: function () {
    pollFor(() => {
      this._getTFLTubeStatus(Endpoints.TFL.TUBE.STATUS)
    }, this.props.refreshRate);
  },
  
  render: function () {
    return (
      <div className="arrival-group tube-status-group">
        { this.state.tubeStatusData && this._renderLineStatus(TflConstants.TUBE.LINE.VICTORIA.NAME) }
        { this.state.tubeStatusData && this._renderLineStatus(TflConstants.TUBE.LINE.PICCADILLY.NAME) }
        { this.state.tubeStatusData && this._renderLineStatus(TflConstants.TUBE.LINE.BAKERLOO.NAME) }
      </div>
    );
  },
  
  _getTFLTubeStatus: function (endpoint) {
    executeXHR({
      method: 'GET',
      endpoint: endpoint,
      action: (xhr) => this.setState({tubeStatusData: JSON.parse(xhr.responseText)})
    });
  },
  
  _getLineStatus: function (line) {
    let lineDetails = underscore.find(this.state.tubeStatusData, (tubeStatus) => tubeStatus.id === line);
    
    return lineDetails.lineStatuses[0].statusSeverityDescription;
  },
  
  _getLineClassName: function (lineStatus) {
    return "tube-status " + TflConstants.TUBE.SERVICE_STATUS_CLASSNAME[lineStatus];
  },
  
  _getLineBackgroundColour: function (line) {
    return TflConstants.TUBE.LINE[line.toUpperCase()]['BACKGROUND-COLOUR'];
  },
  
  _getLineTextColour: function (line) {
    return TflConstants.TUBE.LINE[line.toUpperCase()]['TEXT-COLOUR'];
  },
  
  _renderLineStatus: function (line) {
    let lineStatus = this._getLineStatus(line);
    let className = this._getLineClassName(lineStatus);
    let lineBackgroundColour = this._getLineBackgroundColour(line);
    let lineTextColour = this._getLineTextColour(line);
    
    return (
      <div className="tube-line-status" style={ {backgroundColor: lineBackgroundColour} }>
        <p className="tube-line-status" style={ {color: lineTextColour} }>
          { this._capitaliseFirstLetterOfLine(line) }
          <div className={ className }>
            { lineStatus }
          </div>
        </p>
      </div>
    );
  },
  
  _capitaliseFirstLetterOfLine: function (line) {
    return line.charAt(0).toUpperCase() + line.slice(1);
  }
});
