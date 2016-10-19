import React from "react";
import TramStopArrivals from "./TramStopArrivals.jsx";
import TubeLineStatus from "./TubeLineStatus.jsx";
import TrainTimes from "./TrainTimes.jsx";
import refreshRates from "../config/refreshRates.js";

export default React.createClass({
  
  displayName: 'TravelInformation',
  
  render: function () {
    return (
      <div className="travel-information">
        <TramStopArrivals refreshRate={ refreshRates.TRAM_STOP_ARRIVALS }/>
        <TrainTimes refreshRate={ refreshRates.TRAIN_STATUS }/>
        <TubeLineStatus refreshRate={ refreshRates.TUBE_LINE_STATUS }/>
      </div>
    );
  }
});
